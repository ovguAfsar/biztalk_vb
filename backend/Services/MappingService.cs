using MappingStudio.Api.DTOs;
using MappingStudio.Api.Models;
using MappingStudio.Api.Repositories;
using MongoDB.Bson;
using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MappingStudio.Api.Services;

public sealed class MappingService : IMappingService
{
    private const string DraftStatus = "draft";
    private static readonly Regex FieldNamePattern = new("^[A-Za-z_][A-Za-z0-9_]*$", RegexOptions.Compiled);

    private static readonly HashSet<string> AllowedSourceTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "file",
        "excel",
        "txt",
        "json",
        "xml",
        "api",
        "database",
        "manual"
    };

    private static readonly HashSet<string> AllowedDetectedFileSourceTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "excel",
        "txt"
    };

    private static readonly HashSet<string> AllowedTargetTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "json",
        "xml",
        "api",
        "database",
        "file"
    };

    private static readonly HashSet<string> AllowedFieldTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "text",
        "number",
        "date",
        "boolean",
        "object",
        "array"
    };

    private static readonly HashSet<string> AllowedTransformTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "direct",
        "concat",
        "constant",
        "dateFormat"
    };

    private static readonly HashSet<string> AllowedTargetAlignments = new(StringComparer.OrdinalIgnoreCase)
    {
        "left",
        "right"
    };

    private readonly IMappingRepository _mappingRepository;

    public MappingService(IMappingRepository mappingRepository)
    {
        _mappingRepository = mappingRepository;
    }

    public async Task<MappingResponse> CreateAsync(CreateMappingRequest? request, CancellationToken cancellationToken)
    {
        var errors = Validate(request);
        if (errors.Count > 0)
        {
            throw new MappingValidationException(errors);
        }

        var validRequest = request!;
        var now = DateTime.UtcNow;
        var mapping = new MappingDocument
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Name = validRequest.Name!.Trim(),
            Description = string.IsNullOrWhiteSpace(validRequest.Description) ? null : validRequest.Description.Trim(),
            SourceType = validRequest.SourceType!.Trim().ToLowerInvariant(),
            TargetType = validRequest.TargetType!.Trim().ToLowerInvariant(),
            Status = DraftStatus,
            CreatedAt = now,
            UpdatedAt = now
        };

        await _mappingRepository.CreateAsync(mapping, cancellationToken);

        return ToResponse(mapping);
    }

    public async Task<MappingResponse> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var mapping = await _mappingRepository.GetByIdAsync(id, cancellationToken);
        if (mapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        return ToResponse(mapping);
    }

    public async Task<SourceSchemaResponse> SaveSourceSchemaAsync(
        string id,
        SaveSourceSchemaRequest? request,
        CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var errors = ValidateSourceSchema(request);
        if (errors.Count > 0)
        {
            throw new MappingValidationException(errors);
        }

        var now = DateTime.UtcNow;
        var sourceSchema = new SourceSchemaDocument
        {
            SourceName = request!.SourceName!.Trim(),
            Fields = request.Fields!
                .Select(field => new SourceFieldDocument
                {
                    Name = field.Name!.Trim(),
                    DisplayName = string.IsNullOrWhiteSpace(field.DisplayName) ? null : field.DisplayName.Trim(),
                    Type = field.Type!.Trim().ToLowerInvariant(),
                    Required = field.Required,
                    SampleValue = string.IsNullOrWhiteSpace(field.SampleValue) ? null : field.SampleValue.Trim()
                })
                .ToList()
        };

        var sourceType = string.IsNullOrWhiteSpace(request.SourceType)
            ? null
            : request.SourceType.Trim().ToLowerInvariant();

        var mapping = await _mappingRepository.SaveSourceSchemaAsync(id, sourceSchema, sourceType, now, cancellationToken);
        if (mapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        return ToSourceSchemaResponse(mapping);
    }

    public async Task<TargetSchemaResponse> SaveTargetSchemaAsync(
        string id,
        SaveTargetSchemaRequest? request,
        CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var errors = ValidateTargetSchema(request);
        if (errors.Count > 0)
        {
            throw new MappingValidationException(errors);
        }

        var now = DateTime.UtcNow;
        var targetSchema = new TargetSchemaDocument
        {
            TargetName = request!.TargetName!.Trim(),
            Fields = request.Fields!
                .Select(field => new TargetFieldDocument
                {
                    Name = field.Name!.Trim(),
                    DisplayName = string.IsNullOrWhiteSpace(field.DisplayName) ? null : field.DisplayName.Trim(),
                    Type = field.Type!.Trim().ToLowerInvariant(),
                    Required = field.Required,
                    SampleValue = string.IsNullOrWhiteSpace(field.SampleValue) ? null : field.SampleValue.Trim(),
                    Length = field.Length,
                    StartPosition = field.StartPosition,
                    Format = NormalizeOptionalString(field.Format),
                    Align = NormalizeOptionalString(field.Align)?.ToLowerInvariant(),
                    PadChar = NormalizeSingleCharacter(field.PadChar),
                    FixedValue = field.FixedValue,
                    RequiredForOutput = field.RequiredForOutput
                })
                .ToList()
        };

        var mapping = await _mappingRepository.SaveTargetSchemaAsync(id, targetSchema, now, cancellationToken);
        if (mapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        return ToTargetSchemaResponse(mapping);
    }

    public async Task<SaveMappingsResponse> SaveMappingsAsync(
        string id,
        SaveMappingsRequest? request,
        CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var mapping = await _mappingRepository.GetByIdAsync(id, cancellationToken);
        if (mapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        var errors = ValidateMappingDefinitions(request, mapping);
        if (errors.Count > 0)
        {
            throw new MappingValidationException(errors);
        }

        var now = DateTime.UtcNow;
        var mappingDefinitions = request!.Mappings!
            .Select(mappingDefinition => new MappingDefinitionDocument
            {
                SourceField = mappingDefinition.SourceField!.Trim(),
                TargetField = mappingDefinition.TargetField!.Trim(),
                TransformType = NormalizeTransformType(mappingDefinition.TransformType!)
            })
            .ToList();

        var updatedMapping = await _mappingRepository.SaveMappingDefinitionsAsync(
            id,
            mappingDefinitions,
            now,
            cancellationToken);

        if (updatedMapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        return ToMappingsResponse(updatedMapping);
    }

    public async Task<TestMappingResponse> TestMappingAsync(
        string id,
        TestMappingRequest? request,
        CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var mapping = await _mappingRepository.GetByIdAsync(id, cancellationToken);
        if (mapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        var validationErrors = ValidateTestMappingRequest(request, mapping);
        if (validationErrors.Count > 0)
        {
            throw new MappingValidationException(validationErrors);
        }

        var input = request!.Input!;
        var output = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        var warnings = new List<string>();
        var errors = new List<string>();

        foreach (var mappingDefinition in mapping.MappingDefinitions!)
        {
            var transformType = NormalizeTransformType(mappingDefinition.TransformType);
            var targetField = mappingDefinition.TargetField;

            if (string.IsNullOrWhiteSpace(targetField))
            {
                errors.Add("Target field is empty in a mapping definition.");
                continue;
            }

            switch (transformType)
            {
                case "direct":
                    CopySourceValue(input, output, warnings, mappingDefinition.SourceField, targetField);
                    break;
                case "constant":
                    warnings.Add($"Constant transform for target field '{targetField}' has no constantValue configured.");
                    break;
                case "concat":
                    warnings.Add($"Concat transform for target field '{targetField}' has no sourceFields configured; sourceField fallback was used.");
                    CopySourceValueAsText(input, output, warnings, mappingDefinition.SourceField, targetField);
                    break;
                case "dateFormat":
                    warnings.Add("dateFormat transform is currently pass-through.");
                    CopySourceValue(input, output, warnings, mappingDefinition.SourceField, targetField);
                    break;
                default:
                    errors.Add($"Unsupported transformType '{mappingDefinition.TransformType}' for target field '{targetField}'.");
                    break;
            }
        }

        ApplyTargetFieldFormats(output, mapping.TargetSchema!, warnings);

        return new TestMappingResponse
        {
            Id = mapping.Id,
            Output = output,
            Warnings = warnings,
            Errors = errors
        };
    }

    private static IDictionary<string, string[]> Validate(CreateMappingRequest? request)
    {
        var errors = new Dictionary<string, string[]>();

        if (request is null)
        {
            errors["request"] = new[] { "Request body zorunludur." };
            return errors;
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            errors["name"] = new[] { "Mapping adi bos olamaz." };
        }

        if (string.IsNullOrWhiteSpace(request.SourceType))
        {
            errors["sourceType"] = new[] { "Kaynak veri tipi bos olamaz." };
        }
        else if (!AllowedSourceTypes.Contains(request.SourceType.Trim()))
        {
            errors["sourceType"] = new[] { "Kaynak veri tipi file, excel, txt, json, xml, api, database veya manual olmalidir." };
        }

        if (string.IsNullOrWhiteSpace(request.TargetType))
        {
            errors["targetType"] = new[] { "Hedef veri tipi bos olamaz." };
        }
        else if (!AllowedTargetTypes.Contains(request.TargetType.Trim()))
        {
            errors["targetType"] = new[] { "Hedef veri tipi json, xml, api, database veya file olmalidir." };
        }

        return errors;
    }

    private static void ValidateMappingId(string id)
    {
        if (string.IsNullOrWhiteSpace(id) || !ObjectId.TryParse(id, out _))
        {
            throw new MappingValidationException(new Dictionary<string, string[]>
            {
                ["id"] = new[] { "Mapping id gecerli bir ObjectId olmalidir." }
            });
        }
    }

    private static IDictionary<string, string[]> ValidateSourceSchema(SaveSourceSchemaRequest? request)
    {
        var errors = new Dictionary<string, List<string>>();

        if (request is null)
        {
            AddError(errors, "request", "Request body zorunludur.");
            return ToValidationErrors(errors);
        }

        if (string.IsNullOrWhiteSpace(request.SourceName))
        {
            AddError(errors, "sourceName", "Kaynak adi bos olamaz.");
        }

        if (!string.IsNullOrWhiteSpace(request.SourceType)
            && !AllowedDetectedFileSourceTypes.Contains(request.SourceType.Trim()))
        {
            AddError(errors, "sourceType", "Dosyadan algilanan kaynak tipi excel veya txt olmalidir.");
        }

        if (request.Fields is null || request.Fields.Count == 0)
        {
            AddError(errors, "fields", "En az bir kaynak alani eklenmelidir.");
            return ToValidationErrors(errors);
        }

        var fieldNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        for (var index = 0; index < request.Fields.Count; index++)
        {
            var field = request.Fields[index];
            var nameKey = $"fields[{index}].name";
            var typeKey = $"fields[{index}].type";

            if (string.IsNullOrWhiteSpace(field.Name))
            {
                AddError(errors, nameKey, "Alan adi bos olamaz.");
            }
            else if (!IsValidFieldName(field.Name.Trim()))
            {
                AddError(errors, nameKey, "Alan adi harf veya alt cizgi ile baslamali; sadece harf, rakam ve alt cizgi icermelidir.");
            }
            else if (!fieldNames.Add(field.Name.Trim()))
            {
                AddError(errors, nameKey, "Ayni alan adi birden fazla kullanilamaz.");
            }

            if (string.IsNullOrWhiteSpace(field.Type))
            {
                AddError(errors, typeKey, "Alan tipi bos olamaz.");
            }
            else if (!AllowedFieldTypes.Contains(field.Type.Trim()))
            {
                AddError(errors, typeKey, "Alan tipi text, number, date, boolean, object veya array olmalidir.");
            }
        }

        return ToValidationErrors(errors);
    }

    private static IDictionary<string, string[]> ValidateTestMappingRequest(
        TestMappingRequest? request,
        MappingDocument mapping)
    {
        var errors = new Dictionary<string, List<string>>();

        if (mapping.SourceSchema is null)
        {
            AddError(errors, "sourceSchema", "Kaynak veri tanimlanmadan test calistirilamaz.");
        }

        if (mapping.TargetSchema is null)
        {
            AddError(errors, "targetSchema", "Hedef veri tanimlanmadan test calistirilamaz.");
        }

        if (mapping.MappingDefinitions is null || mapping.MappingDefinitions.Count == 0)
        {
            AddError(errors, "mappingDefinitions", "Alan eslestirmesi yapilmadan test calistirilamaz.");
        }

        if (request is null)
        {
            AddError(errors, "request", "Request body zorunludur.");
            return ToValidationErrors(errors);
        }

        if (request.Input is null || request.Input.Count == 0)
        {
            AddError(errors, "input", "Test input bos olamaz.");
        }

        return ToValidationErrors(errors);
    }

    private static IDictionary<string, string[]> ValidateMappingDefinitions(
        SaveMappingsRequest? request,
        MappingDocument mapping)
    {
        var errors = new Dictionary<string, List<string>>();

        if (mapping.SourceSchema is null)
        {
            AddError(errors, "sourceSchema", "Kaynak veri tanimlanmadan mapping yapilamaz.");
        }

        if (mapping.TargetSchema is null)
        {
            AddError(errors, "targetSchema", "Hedef veri tanimlanmadan mapping yapilamaz.");
        }

        if (request is null)
        {
            AddError(errors, "request", "Request body zorunludur.");
            return ToValidationErrors(errors);
        }

        if (request.Mappings is null)
        {
            AddError(errors, "mappings", "Mapping listesi zorunludur.");
            return ToValidationErrors(errors);
        }
        else if (request.Mappings.Count == 0)
        {
            AddError(errors, "mappings", "En az bir alan eslestirmesi yapilmalidir.");
        }

        if (mapping.SourceSchema is null || mapping.TargetSchema is null)
        {
            return ToValidationErrors(errors);
        }

        var sourceFields = mapping.SourceSchema.Fields
            .Select(field => field.Name)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var targetFields = mapping.TargetSchema.Fields
            .Select(field => field.Name)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var mappedTargets = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        for (var index = 0; index < request.Mappings.Count; index++)
        {
            var mappingDefinition = request.Mappings[index];
            var sourceKey = $"mappings[{index}].sourceField";
            var targetKey = $"mappings[{index}].targetField";
            var transformKey = $"mappings[{index}].transformType";

            if (string.IsNullOrWhiteSpace(mappingDefinition.SourceField))
            {
                AddError(errors, sourceKey, "Kaynak alan bos olamaz.");
            }
            else if (!sourceFields.Contains(mappingDefinition.SourceField.Trim()))
            {
                AddError(errors, sourceKey, "Kaynak alan source schema icinde bulunmalidir.");
            }

            if (string.IsNullOrWhiteSpace(mappingDefinition.TargetField))
            {
                AddError(errors, targetKey, "Hedef alan bos olamaz.");
            }
            else if (!targetFields.Contains(mappingDefinition.TargetField.Trim()))
            {
                AddError(errors, targetKey, "Hedef alan target schema icinde bulunmalidir.");
            }
            else if (!mappedTargets.Add(mappingDefinition.TargetField.Trim()))
            {
                AddError(errors, targetKey, "Ayni hedef alan birden fazla mapping icinde kullanilamaz.");
            }

            if (string.IsNullOrWhiteSpace(mappingDefinition.TransformType))
            {
                AddError(errors, transformKey, "Transform tipi bos olamaz.");
            }
            else if (!AllowedTransformTypes.Contains(mappingDefinition.TransformType.Trim()))
            {
                AddError(errors, transformKey, "Transform tipi direct, concat, constant veya dateFormat olmalidir.");
            }
        }

        return ToValidationErrors(errors);
    }

    private static IDictionary<string, string[]> ValidateTargetSchema(SaveTargetSchemaRequest? request)
    {
        var errors = new Dictionary<string, List<string>>();

        if (request is null)
        {
            AddError(errors, "request", "Request body zorunludur.");
            return ToValidationErrors(errors);
        }

        if (string.IsNullOrWhiteSpace(request.TargetName))
        {
            AddError(errors, "targetName", "Hedef adi bos olamaz.");
        }

        if (request.Fields is null || request.Fields.Count == 0)
        {
            AddError(errors, "fields", "En az bir hedef alani eklenmelidir.");
            return ToValidationErrors(errors);
        }

        var fieldNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        for (var index = 0; index < request.Fields.Count; index++)
        {
            var field = request.Fields[index];
            var nameKey = $"fields[{index}].name";
            var typeKey = $"fields[{index}].type";
            var lengthKey = $"fields[{index}].length";
            var startPositionKey = $"fields[{index}].startPosition";
            var alignKey = $"fields[{index}].align";
            var padCharKey = $"fields[{index}].padChar";
            var fixedValueKey = $"fields[{index}].fixedValue";

            if (string.IsNullOrWhiteSpace(field.Name))
            {
                AddError(errors, nameKey, "Alan adi bos olamaz.");
            }
            else if (!IsValidFieldName(field.Name.Trim()))
            {
                AddError(errors, nameKey, "Alan adi harf veya alt cizgi ile baslamali; sadece harf, rakam ve alt cizgi icermelidir.");
            }
            else if (!fieldNames.Add(field.Name.Trim()))
            {
                AddError(errors, nameKey, "Ayni alan adi birden fazla kullanilamaz.");
            }

            if (string.IsNullOrWhiteSpace(field.Type))
            {
                AddError(errors, typeKey, "Alan tipi bos olamaz.");
            }
            else if (!AllowedFieldTypes.Contains(field.Type.Trim()))
            {
                AddError(errors, typeKey, "Alan tipi text, number, date, boolean, object veya array olmalidir.");
            }

            if (field.Length.HasValue && field.Length.Value <= 0)
            {
                AddError(errors, lengthKey, "Alan uzunlugu 0'dan buyuk olmalidir.");
            }

            if (field.StartPosition.HasValue && field.StartPosition.Value < 0)
            {
                AddError(errors, startPositionKey, "Baslangic pozisyonu 0 veya daha buyuk olmalidir.");
            }

            if (!string.IsNullOrWhiteSpace(field.Align)
                && !AllowedTargetAlignments.Contains(field.Align.Trim()))
            {
                AddError(errors, alignKey, "Hizalama left veya right olmalidir.");
            }

            if (field.PadChar is not null && field.PadChar.Length != 1)
            {
                AddError(errors, padCharKey, "Padding karakteri tek karakter olmalidir.");
            }

            if (field.FixedValue is not null
                && field.Length.HasValue
                && field.FixedValue.Length > field.Length.Value)
            {
                AddError(errors, fixedValueKey, "Sabit deger alan uzunlugundan buyuk olamaz.");
            }
        }

        return ToValidationErrors(errors);
    }

    private static bool IsValidFieldName(string fieldName)
    {
        return FieldNamePattern.IsMatch(fieldName);
    }

    private static void AddError(IDictionary<string, List<string>> errors, string key, string message)
    {
        if (!errors.TryGetValue(key, out var messages))
        {
            messages = new List<string>();
            errors[key] = messages;
        }

        messages.Add(message);
    }

    private static IDictionary<string, string[]> ToValidationErrors(IDictionary<string, List<string>> errors)
    {
        return errors.ToDictionary(error => error.Key, error => error.Value.ToArray());
    }

    private static MappingResponse ToResponse(MappingDocument mapping)
    {
        return new MappingResponse
        {
            Id = mapping.Id,
            Name = mapping.Name,
            Description = mapping.Description,
            SourceType = mapping.SourceType,
            TargetType = mapping.TargetType,
            Status = mapping.Status,
            SourceSchema = mapping.SourceSchema is null ? null : ToSourceSchemaDetails(mapping.SourceSchema),
            TargetSchema = mapping.TargetSchema is null ? null : ToTargetSchemaDetails(mapping.TargetSchema),
            MappingDefinitions = mapping.MappingDefinitions is null ? null : ToMappingDefinitionDtos(mapping.MappingDefinitions),
            CreatedAt = mapping.CreatedAt,
            UpdatedAt = mapping.UpdatedAt
        };
    }

    private static SourceSchemaResponse ToSourceSchemaResponse(MappingDocument mapping)
    {
        var sourceSchema = mapping.SourceSchema!;

        return new SourceSchemaResponse
        {
            Id = mapping.Id,
            SourceName = sourceSchema.SourceName,
            SourceType = mapping.SourceType,
            Fields = sourceSchema.Fields
                .Select(field => new SourceFieldDto
                {
                    Name = field.Name,
                    DisplayName = field.DisplayName,
                    Type = field.Type,
                    Required = field.Required,
                    SampleValue = field.SampleValue
                })
                .ToList(),
            UpdatedAt = mapping.UpdatedAt
        };
    }

    private static SaveMappingsResponse ToMappingsResponse(MappingDocument mapping)
    {
        return new SaveMappingsResponse
        {
            Id = mapping.Id,
            Mappings = ToMappingDefinitionDtos(mapping.MappingDefinitions ?? new List<MappingDefinitionDocument>()),
            UpdatedAt = mapping.UpdatedAt
        };
    }

    private static TargetSchemaResponse ToTargetSchemaResponse(MappingDocument mapping)
    {
        var targetSchema = mapping.TargetSchema!;

        return new TargetSchemaResponse
        {
            Id = mapping.Id,
            TargetName = targetSchema.TargetName,
            TargetType = mapping.TargetType,
            Fields = targetSchema.Fields
                .Select(ToTargetFieldDto)
                .ToList(),
            UpdatedAt = mapping.UpdatedAt
        };
    }

    private static SourceSchemaDetails ToSourceSchemaDetails(SourceSchemaDocument sourceSchema)
    {
        return new SourceSchemaDetails
        {
            SourceName = sourceSchema.SourceName,
            Fields = sourceSchema.Fields
                .Select(field => new SourceFieldDto
                {
                    Name = field.Name,
                    DisplayName = field.DisplayName,
                    Type = field.Type,
                    Required = field.Required,
                    SampleValue = field.SampleValue
                })
                .ToList()
        };
    }

    private static TargetSchemaDetails ToTargetSchemaDetails(TargetSchemaDocument targetSchema)
    {
        return new TargetSchemaDetails
        {
            TargetName = targetSchema.TargetName,
            Fields = targetSchema.Fields
                .Select(ToTargetFieldDto)
                .ToList()
        };
    }

    private static TargetFieldDto ToTargetFieldDto(TargetFieldDocument field)
    {
        return new TargetFieldDto
        {
            Name = field.Name,
            DisplayName = field.DisplayName,
            Type = field.Type,
            Required = field.Required,
            SampleValue = field.SampleValue,
            Length = field.Length,
            StartPosition = field.StartPosition,
            Format = field.Format,
            Align = field.Align,
            PadChar = field.PadChar,
            FixedValue = field.FixedValue,
            RequiredForOutput = field.RequiredForOutput
        };
    }

    private static IReadOnlyList<MappingDefinitionDto> ToMappingDefinitionDtos(
        IReadOnlyList<MappingDefinitionDocument> mappingDefinitions)
    {
        return mappingDefinitions
            .Select(mappingDefinition => new MappingDefinitionDto
            {
                SourceField = mappingDefinition.SourceField,
                TargetField = mappingDefinition.TargetField,
                TransformType = mappingDefinition.TransformType
            })
            .ToList();
    }

    private static string NormalizeTransformType(string transformType)
    {
        var trimmedTransformType = transformType.Trim();
        return trimmedTransformType.Equals("dateFormat", StringComparison.OrdinalIgnoreCase)
            ? "dateFormat"
            : trimmedTransformType.ToLowerInvariant();
    }

    private static string? NormalizeOptionalString(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private static string? NormalizeSingleCharacter(string? value)
    {
        return string.IsNullOrEmpty(value) ? null : value[..1];
    }

    private static void ApplyTargetFieldFormats(
        IDictionary<string, object?> output,
        TargetSchemaDocument targetSchema,
        ICollection<string> warnings)
    {
        foreach (var field in targetSchema.Fields)
        {
            if (!output.TryGetValue(field.Name, out var value))
            {
                if (field.FixedValue is not null)
                {
                    output[field.Name] = FormatTargetFieldValue(null, field, warnings);
                    continue;
                }

                if (field.RequiredForOutput)
                {
                    warnings.Add($"Target field '{field.Name}' is required by the output format but has no mapped value.");
                }

                continue;
            }

            if (!HasTargetFormatting(field))
            {
                continue;
            }

            output[field.Name] = FormatTargetFieldValue(value, field, warnings);
        }
    }

    private static bool HasTargetFormatting(TargetFieldDocument field)
    {
        return field.Length.HasValue
            || !string.IsNullOrWhiteSpace(field.Format)
            || !string.IsNullOrWhiteSpace(field.Align)
            || !string.IsNullOrEmpty(field.PadChar)
            || field.FixedValue is not null;
    }

    private static string FormatTargetFieldValue(
        object? value,
        TargetFieldDocument field,
        ICollection<string> warnings)
    {
        var text = field.FixedValue is not null ? field.FixedValue : ObjectValueToText(value);
        var format = field.Format?.Trim();

        if (field.FixedValue is null && !string.IsNullOrWhiteSpace(format))
        {
            if (format.Equals("YYYYMMDD", StringComparison.OrdinalIgnoreCase)
                || format.Equals("yyyyMMdd", StringComparison.OrdinalIgnoreCase))
            {
                text = FormatDateValue(value, text, field.Name, warnings);
            }
            else if (format.StartsWith("amount", StringComparison.OrdinalIgnoreCase)
                || format.StartsWith("decimal", StringComparison.OrdinalIgnoreCase))
            {
                text = FormatDecimalValue(value, text, field.Name, warnings);
            }
        }

        return field.Length.HasValue
            ? ApplyFixedLength(text, field, warnings)
            : text;
    }

    private static string ApplyFixedLength(
        string value,
        TargetFieldDocument field,
        ICollection<string> warnings)
    {
        var length = field.Length!.Value;
        var normalizedValue = value;

        if (normalizedValue.Length > length)
        {
            warnings.Add($"Target field '{field.Name}' exceeded length {length}; value was truncated.");
            normalizedValue = normalizedValue[..length];
        }

        if (normalizedValue.Length == length)
        {
            return normalizedValue;
        }

        var align = string.IsNullOrWhiteSpace(field.Align)
            ? (field.Type.Equals("number", StringComparison.OrdinalIgnoreCase) ? "right" : "left")
            : field.Align.Trim().ToLowerInvariant();
        var padChar = string.IsNullOrEmpty(field.PadChar) ? ' ' : field.PadChar[0];

        return align == "right"
            ? normalizedValue.PadLeft(length, padChar)
            : normalizedValue.PadRight(length, padChar);
    }

    private static string FormatDateValue(
        object? value,
        string fallbackText,
        string fieldName,
        ICollection<string> warnings)
    {
        if (TryGetDateTime(value, fallbackText, out var dateValue))
        {
            return dateValue.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
        }

        warnings.Add($"Target field '{fieldName}' could not be formatted as YYYYMMDD.");
        return fallbackText;
    }

    private static string FormatDecimalValue(
        object? value,
        string fallbackText,
        string fieldName,
        ICollection<string> warnings)
    {
        if (TryGetDecimal(value, fallbackText, out var decimalValue))
        {
            return decimalValue.ToString("0.00", CultureInfo.InvariantCulture);
        }

        warnings.Add($"Target field '{fieldName}' could not be formatted as decimal amount.");
        return fallbackText;
    }

    private static bool TryGetDateTime(object? value, string fallbackText, out DateTime dateValue)
    {
        if (value is JsonElement jsonElement && jsonElement.ValueKind == JsonValueKind.String)
        {
            return DateTime.TryParse(
                jsonElement.GetString(),
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out dateValue);
        }

        return DateTime.TryParse(fallbackText, CultureInfo.InvariantCulture, DateTimeStyles.None, out dateValue);
    }

    private static bool TryGetDecimal(object? value, string fallbackText, out decimal decimalValue)
    {
        if (value is JsonElement jsonElement)
        {
            if (jsonElement.ValueKind == JsonValueKind.Number && jsonElement.TryGetDecimal(out decimalValue))
            {
                return true;
            }

            if (jsonElement.ValueKind == JsonValueKind.String)
            {
                return TryParseDecimalText(jsonElement.GetString(), out decimalValue);
            }
        }

        return TryParseDecimalText(fallbackText, out decimalValue);
    }

    private static bool TryParseDecimalText(string? value, out decimal decimalValue)
    {
        return decimal.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out decimalValue)
            || decimal.TryParse(value, NumberStyles.Number, CultureInfo.GetCultureInfo("tr-TR"), out decimalValue);
    }

    private static void CopySourceValue(
        IReadOnlyDictionary<string, JsonElement> input,
        IDictionary<string, object?> output,
        ICollection<string> warnings,
        string sourceField,
        string targetField)
    {
        if (string.IsNullOrWhiteSpace(sourceField))
        {
            warnings.Add($"Source field is empty for target field '{targetField}'.");
            return;
        }

        if (!input.TryGetValue(sourceField, out var value))
        {
            warnings.Add($"Source field '{sourceField}' was not found in input.");
            return;
        }

        output[targetField] = value.Clone();
    }

    private static void CopySourceValueAsText(
        IReadOnlyDictionary<string, JsonElement> input,
        IDictionary<string, object?> output,
        ICollection<string> warnings,
        string sourceField,
        string targetField)
    {
        if (string.IsNullOrWhiteSpace(sourceField))
        {
            warnings.Add($"Source field is empty for target field '{targetField}'.");
            return;
        }

        if (!input.TryGetValue(sourceField, out var value))
        {
            warnings.Add($"Source field '{sourceField}' was not found in input.");
            return;
        }

        output[targetField] = JsonElementToText(value);
    }

    private static string ObjectValueToText(object? value)
    {
        return value is JsonElement jsonElement ? JsonElementToText(jsonElement) : value?.ToString() ?? string.Empty;
    }

    private static string JsonElementToText(JsonElement value)
    {
        return value.ValueKind switch
        {
            JsonValueKind.String => value.GetString() ?? string.Empty,
            JsonValueKind.Number => value.GetRawText(),
            JsonValueKind.True => "true",
            JsonValueKind.False => "false",
            JsonValueKind.Null => string.Empty,
            JsonValueKind.Undefined => string.Empty,
            _ => value.GetRawText()
        };
    }
}
