using MappingStudio.Api.DTOs;
using MappingStudio.Api.Models;
using MappingStudio.Api.Repositories;
using MongoDB.Bson;
using System.Text.Json;

namespace MappingStudio.Api.Services;

public sealed class MappingService : IMappingService
{
    private const string DraftStatus = "draft";

    private static readonly HashSet<string> AllowedSourceTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "file",
        "excel",
        "json",
        "xml",
        "api",
        "database",
        "manual"
    };

    private static readonly HashSet<string> AllowedDetectedFileSourceTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "excel",
        "json",
        "xml"
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
                    SampleValue = string.IsNullOrWhiteSpace(field.SampleValue) ? null : field.SampleValue.Trim()
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
            errors["sourceType"] = new[] { "Kaynak veri tipi file, excel, json, xml, api, database veya manual olmalidir." };
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
            AddError(errors, "sourceType", "Dosyadan algilanan kaynak tipi excel, json veya xml olmalidir.");
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

            if (string.IsNullOrWhiteSpace(field.Name))
            {
                AddError(errors, nameKey, "Alan adi bos olamaz.");
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
                .Select(field => new TargetFieldDto
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
                .Select(field => new TargetFieldDto
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
