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
    private const string CompletedStatus = "completed";
    private static readonly Regex FieldNamePattern = new("^[A-Za-z_][A-Za-z0-9_]*$", RegexOptions.Compiled);

    private static readonly HashSet<string> AllowedStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        DraftStatus,
        CompletedStatus
    };

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
        "dateFormat",
        "uppercase",
        "lowercase",
        "trim"
    };

    private static readonly HashSet<string> AllowedTargetAlignments = new(StringComparer.OrdinalIgnoreCase)
    {
        "left",
        "right"
    };

    private const int AyKodluIbanLineLength = 81;

    private static readonly IReadOnlyList<FixedWidthTargetField> AyKodluIbanFields = new List<FixedWidthTargetField>
    {
        new("subeKodu", 1, 3),
        new("kurumKodu", 4, 2),
        new("hesapNo", 6, 17),
        new("tc", 23, 11),
        new("ayKodu", 35, 2),
        new("tutar", 37, 18),
        new("maasTuru", 55, 1),
        new("iban", 56, 26)
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

    public async Task<IReadOnlyList<MappingResponse>> GetAllAsync(CancellationToken cancellationToken)
    {
        var mappings = await _mappingRepository.GetAllAsync(cancellationToken);
        return mappings.Select(ToResponse).ToList();
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

    public async Task<MappingResponse> UpdateAsync(
        string id,
        UpdateMappingRequest? request,
        CancellationToken cancellationToken)
    {
        ValidateMappingId(id);

        var errors = Validate(request);
        if (errors.Count > 0)
        {
            throw new MappingValidationException(errors);
        }

        var validRequest = request!;
        var updatedMapping = await _mappingRepository.UpdateAsync(
            id,
            validRequest.Name!.Trim(),
            string.IsNullOrWhiteSpace(validRequest.Description) ? null : validRequest.Description.Trim(),
            validRequest.SourceType!.Trim().ToLowerInvariant(),
            validRequest.TargetType!.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(validRequest.Status) ? DraftStatus : validRequest.Status.Trim().ToLowerInvariant(),
            DateTime.UtcNow,
            cancellationToken);

        if (updatedMapping is null)
        {
            throw new MappingNotFoundException(id);
        }

        return ToResponse(updatedMapping);
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
                    SampleValue = string.IsNullOrWhiteSpace(field.SampleValue) ? null : field.SampleValue.Trim(),
                    StartPosition = field.StartPosition,
                    EndPosition = field.EndPosition,
                    Length = ResolveSourceFieldLength(field)
                })
                .ToList(),
            Records = NormalizeSourceRecords(request.Records)
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

        var warnings = ValidateMappingWarnings(request!, mapping);
        if (warnings.Count > 0 && !request!.ConfirmWarnings)
        {
            return new SaveMappingsResponse
            {
                Id = mapping.Id,
                Mappings = request.Mappings!,
                Warnings = warnings,
                UpdatedAt = mapping.UpdatedAt
            };
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

        var inputRecords = GetInputRecords(request!.Input!.Value);
        var outputs = new List<IReadOnlyDictionary<string, object?>>();
        var warnings = new List<string>();
        var errors = new List<string>();

        for (var index = 0; index < inputRecords.Count; index++)
        {
            var rowWarnings = new List<string>();
            var rowErrors = new List<string>();
            outputs.Add(ApplyMappingToInputRecord(inputRecords[index], mapping, rowWarnings, rowErrors));

            warnings.AddRange(rowWarnings.Select(warning => PrefixRowMessage(index, inputRecords.Count, warning)));
            errors.AddRange(rowErrors.Select(error => PrefixRowMessage(index, inputRecords.Count, error)));
        }

        return new TestMappingResponse
        {
            Id = mapping.Id,
            Output = outputs,
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

    private static IDictionary<string, string[]> Validate(UpdateMappingRequest? request)
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

        if (!string.IsNullOrWhiteSpace(request.Status)
            && !AllowedStatuses.Contains(request.Status.Trim()))
        {
            errors["status"] = new[] { "Mapping durumu draft veya completed olmalidir." };
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

        if (request.Fields is null)
        {
            AddError(errors, "fields", "En az bir kaynak alani eklenmelidir.");
            return ToValidationErrors(errors);
        }

        if (request.Fields.Count == 0)
        {
            if (!IsFixedWidthRawSourceRequest(request))
            {
                AddError(errors, "fields", "En az bir kaynak alani eklenmelidir.");
            }

            return ToValidationErrors(errors);
        }

        var fieldNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var fixedWidthRanges = new List<(int Index, string Name, int StartPosition, int EndPosition)>();

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

            ValidateSourceFieldPositions(errors, field, index, fixedWidthRanges);
        }

        for (var index = 0; index < fixedWidthRanges.Count; index++)
        {
            for (var nextIndex = index + 1; nextIndex < fixedWidthRanges.Count; nextIndex++)
            {
                var current = fixedWidthRanges[index];
                var next = fixedWidthRanges[nextIndex];

                if (current.StartPosition <= next.EndPosition && next.StartPosition <= current.EndPosition)
                {
                    AddError(
                        errors,
                        $"fields[{next.Index}].startPosition",
                        $"Pozisyon araligi '{current.Name}' alani ile cakisir.");
                }
            }
        }

        return ToValidationErrors(errors);
    }

    private static void ValidateSourceFieldPositions(
        IDictionary<string, List<string>> errors,
        SourceFieldDto field,
        int index,
        ICollection<(int Index, string Name, int StartPosition, int EndPosition)> fixedWidthRanges)
    {
        var startPositionKey = $"fields[{index}].startPosition";
        var endPositionKey = $"fields[{index}].endPosition";
        var lengthKey = $"fields[{index}].length";
        var hasStartPosition = field.StartPosition.HasValue;
        var hasEndPosition = field.EndPosition.HasValue;

        if (hasStartPosition != hasEndPosition)
        {
            AddError(errors, startPositionKey, "Baslangic ve bitis pozisyonlari birlikte girilmelidir.");
            AddError(errors, endPositionKey, "Baslangic ve bitis pozisyonlari birlikte girilmelidir.");
            return;
        }

        if (!hasStartPosition || !hasEndPosition)
        {
            return;
        }

        if (field.StartPosition!.Value < 1)
        {
            AddError(errors, startPositionKey, "Baslangic pozisyonu 1 veya daha buyuk olmalidir.");
        }

        if (field.EndPosition!.Value < field.StartPosition.Value)
        {
            AddError(errors, endPositionKey, "Bitis pozisyonu baslangic pozisyonundan kucuk olamaz.");
        }

        var expectedLength = field.EndPosition.Value - field.StartPosition.Value + 1;
        if (field.Length.HasValue && field.Length.Value != expectedLength)
        {
            AddError(errors, lengthKey, "Alan uzunlugu baslangic ve bitis pozisyonlari ile uyumlu olmalidir.");
        }

        if (field.StartPosition.Value >= 1 && field.EndPosition.Value >= field.StartPosition.Value)
        {
            fixedWidthRanges.Add((
                index,
                string.IsNullOrWhiteSpace(field.Name) ? $"fields[{index}]" : field.Name.Trim(),
                field.StartPosition.Value,
                field.EndPosition.Value));
        }
    }

    private static bool IsFixedWidthRawSourceRequest(SaveSourceSchemaRequest request)
    {
        return request.SourceType?.Trim().Equals("txt", StringComparison.OrdinalIgnoreCase) == true
            && request.Records is not null
            && request.Records.Count > 0
            && request.Records.All(record => record.ContainsKey("line"));
    }

    private static int? ResolveSourceFieldLength(SourceFieldDto field)
    {
        if (field.StartPosition.HasValue && field.EndPosition.HasValue)
        {
            return field.EndPosition.Value - field.StartPosition.Value + 1;
        }

        return field.Length;
    }

    private static List<Dictionary<string, string?>>? NormalizeSourceRecords(
        IReadOnlyList<Dictionary<string, string?>>? records)
    {
        if (records is null || records.Count == 0)
        {
            return null;
        }

        return records
            .Where(record => record.Count > 0)
            .Select(record => record.ToDictionary(
                item => item.Key.Trim(),
                item => string.IsNullOrWhiteSpace(item.Value) ? null : item.Value,
                StringComparer.OrdinalIgnoreCase))
            .Where(record => record.Count > 0)
            .ToList();
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

        if (request.Input is null
            || request.Input.Value.ValueKind == JsonValueKind.Undefined
            || request.Input.Value.ValueKind == JsonValueKind.Null)
        {
            AddError(errors, "input", "Test input bos olamaz.");
        }
        else if (!IsValidTestInputShape(request.Input.Value))
        {
            AddError(errors, "input", "Test input bir object veya object listesi olmalidir.");
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
            else if (NormalizeTransformType(mappingDefinition.TransformType ?? string.Empty) == "concat")
            {
                var missingSourceFields = GetSourceFieldNames(mappingDefinition.SourceField)
                    .Where(sourceField => !sourceFields.Contains(sourceField))
                    .ToList();

                if (missingSourceFields.Count > 0)
                {
                    AddError(errors, sourceKey, "Concat icindeki tum kaynak alanlar source schema icinde bulunmalidir.");
                }
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
                AddError(errors, transformKey, "Transform tipi direct, concat, constant, dateFormat, uppercase, lowercase veya trim olmalidir.");
            }
        }

        var missingRequiredTargetFields = mapping.TargetSchema.Fields
            .Where(field => field.Required && !mappedTargets.Contains(field.Name))
            .Select(field => string.IsNullOrWhiteSpace(field.DisplayName) ? field.Name : field.DisplayName)
            .ToList();

        if (missingRequiredTargetFields.Count > 0)
        {
            AddError(
                errors,
                "mappings",
                $"Zorunlu hedef alanlar eslestirilmeden devam edilemez: {string.Join(", ", missingRequiredTargetFields)}.");
        }

        return ToValidationErrors(errors);
    }

    private static IReadOnlyList<string> ValidateMappingWarnings(
        SaveMappingsRequest request,
        MappingDocument mapping)
    {
        var warnings = new List<string>();
        if (mapping.SourceSchema is null || mapping.TargetSchema is null || request.Mappings is null)
        {
            return warnings;
        }

        foreach (var mappingDefinition in request.Mappings)
        {
            if (IsAyKodluIbanTargetSchema(mapping.TargetSchema) && IsFixedWidthSourceField(mappingDefinition.SourceField))
            {
                continue;
            }

            var sourceFields = GetSourceFieldNames(mappingDefinition.SourceField)
                .Select(sourceField => mapping.SourceSchema.Fields.FirstOrDefault(field =>
                    field.Name.Equals(sourceField, StringComparison.OrdinalIgnoreCase)))
                .Where(field => field is not null)
                .Cast<SourceFieldDocument>()
                .ToList();
            var targetField = mapping.TargetSchema.Fields.FirstOrDefault(field =>
                field.Name.Equals(mappingDefinition.TargetField ?? string.Empty, StringComparison.OrdinalIgnoreCase));

            if (sourceFields.Count == 0 || targetField is null)
            {
                continue;
            }

            var sourceLabel = string.Join(" + ", sourceFields.Select(GetSourceFieldLabel));
            var targetLabel = GetTargetFieldLabel(targetField);

            if (IsTypeMismatch(sourceFields, targetField, mappingDefinition.TransformType))
            {
                warnings.Add($"Tip uyumsuzluğu olabilir: kaynak '{sourceLabel}' ({string.Join(" + ", sourceFields.Select(field => field.Type))}) hedef '{targetLabel}' ({targetField.Type}) alanına eşlenmiş.");
            }
        }

        return warnings;
    }

    private static bool IsTypeMismatch(
        IReadOnlyList<SourceFieldDocument> sourceFields,
        TargetFieldDocument targetField,
        string? transformType)
    {
        var normalizedTransform = NormalizeTransformType(transformType ?? string.Empty);
        if (normalizedTransform == "constant")
        {
            return false;
        }

        if (sourceFields.Count > 1)
        {
            return !targetField.Type.Equals("text", StringComparison.OrdinalIgnoreCase);
        }

        var sourceType = sourceFields[0].Type;
        var targetType = targetField.Type;

        if (sourceType.Equals(targetType, StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        if (normalizedTransform == "dateFormat" && targetType.Equals("date", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        return true;
    }

    private static string GetSourceFieldLabel(SourceFieldDocument field)
    {
        return string.IsNullOrWhiteSpace(field.DisplayName) ? field.Name : $"{field.DisplayName} ({field.Name})";
    }

    private static string GetTargetFieldLabel(TargetFieldDocument field)
    {
        return string.IsNullOrWhiteSpace(field.DisplayName) ? field.Name : $"{field.DisplayName} ({field.Name})";
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

    private static bool IsValidTestInputShape(JsonElement input)
    {
        if (input.ValueKind == JsonValueKind.Object)
        {
            return input.EnumerateObject().Any();
        }

        return input.ValueKind == JsonValueKind.Array
            && input.EnumerateArray().Any()
            && input.EnumerateArray().All(item => item.ValueKind == JsonValueKind.Object);
    }

    private static IReadOnlyList<IReadOnlyDictionary<string, JsonElement>> GetInputRecords(JsonElement input)
    {
        if (input.ValueKind == JsonValueKind.Object)
        {
            return new[] { JsonObjectToDictionary(input) };
        }

        return input
            .EnumerateArray()
            .Select(JsonObjectToDictionary)
            .ToList();
    }

    private static IReadOnlyDictionary<string, JsonElement> JsonObjectToDictionary(JsonElement input)
    {
        return input
            .EnumerateObject()
            .ToDictionary(
                property => property.Name,
                property => property.Value.Clone(),
                StringComparer.OrdinalIgnoreCase);
    }

    private static string PrefixRowMessage(int rowIndex, int recordCount, string message)
    {
        return recordCount <= 1 ? message : $"Record {rowIndex + 1}: {message}";
    }

    private static IReadOnlyDictionary<string, object?> ApplyMappingToInputRecord(
        IReadOnlyDictionary<string, JsonElement> input,
        MappingDocument mapping,
        ICollection<string> warnings,
        ICollection<string> errors)
    {
        var output = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        var fixedWidthParsedTargets = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var fixedWidthPatternApplied = false;
        var mappedTargets = mapping.MappingDefinitions!
            .Select(mappingDefinition => mappingDefinition.TargetField)
            .Where(targetField => !string.IsNullOrWhiteSpace(targetField))
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

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
                    ConcatSourceValues(input, output, warnings, mappingDefinition.SourceField, targetField);
                    break;
                case "dateFormat":
                    FormatSourceDate(input, output, warnings, mappingDefinition.SourceField, targetField);
                    break;
                case "uppercase":
                    TransformSourceText(
                        input,
                        output,
                        warnings,
                        mappingDefinition.SourceField,
                        targetField,
                        value => value.ToUpperInvariant());
                    break;
                case "lowercase":
                    TransformSourceText(
                        input,
                        output,
                        warnings,
                        mappingDefinition.SourceField,
                        targetField,
                        value => value.ToLowerInvariant());
                    break;
                case "trim":
                    TransformSourceText(
                        input,
                        output,
                        warnings,
                        mappingDefinition.SourceField,
                        targetField,
                        value => value.Trim());
                    break;
                default:
                    errors.Add($"Unsupported transformType '{mappingDefinition.TransformType}' for target field '{targetField}'.");
                    break;
            }
        }

        ApplyTargetFieldFormats(output, mapping.TargetSchema!, mappedTargets, fixedWidthParsedTargets, fixedWidthPatternApplied, warnings, errors);
        return output;
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
                    SampleValue = field.SampleValue,
                    StartPosition = field.StartPosition,
                    EndPosition = field.EndPosition,
                    Length = field.Length
                })
                .ToList(),
            Records = sourceSchema.Records,
            UpdatedAt = mapping.UpdatedAt
        };
    }

    private static SaveMappingsResponse ToMappingsResponse(MappingDocument mapping)
    {
        return new SaveMappingsResponse
        {
            Id = mapping.Id,
            Mappings = ToMappingDefinitionDtos(mapping.MappingDefinitions ?? new List<MappingDefinitionDocument>()),
            Warnings = Array.Empty<string>(),
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
                    SampleValue = field.SampleValue,
                    StartPosition = field.StartPosition,
                    EndPosition = field.EndPosition,
                    Length = field.Length
                })
                .ToList(),
            Records = sourceSchema.Records
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

    private static bool ApplyAyKodluIbanFixedWidthPattern(
        IReadOnlyDictionary<string, JsonElement> input,
        IDictionary<string, object?> output,
        TargetSchemaDocument targetSchema,
        ISet<string> parsedTargets,
        ICollection<string> warnings,
        ICollection<string> errors)
    {
        if (!IsAyKodluIbanTargetSchema(targetSchema))
        {
            return false;
        }

        if (!TryGetFixedWidthSourceLine(input, out var sourceLine))
        {
            return false;
        }

        if (sourceLine.Length != AyKodluIbanLineLength)
        {
            errors.Add($"AyKodluIban fixed-width line expects length {AyKodluIbanLineLength} but received value of length {sourceLine.Length}.");
            return true;
        }

        foreach (var field in AyKodluIbanFields)
        {
            output[field.Name] = sourceLine.Substring(field.StartPosition - 1, field.Length);
            parsedTargets.Add(field.Name);
        }

        return true;
    }

    private static bool IsAyKodluIbanTargetSchema(TargetSchemaDocument targetSchema)
    {
        var targetFieldNames = targetSchema.Fields
            .Select(field => field.Name)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        return AyKodluIbanFields.All(field => targetFieldNames.Contains(field.Name));
    }

    private static bool IsAyKodluIbanTargetField(string fieldName)
    {
        return AyKodluIbanFields.Any(field => field.Name.Equals(fieldName, StringComparison.OrdinalIgnoreCase));
    }

    private static bool TryGetFixedWidthSourceLine(
        IReadOnlyDictionary<string, JsonElement> input,
        out string sourceLine)
    {
        var preferredKeys = new[] { "line", "satir", "satır", "rawLine", "record", "row", "fixedWidthLine", "data" };

        foreach (var key in preferredKeys)
        {
            if (input.TryGetValue(key, out var value) && TryGetJsonString(value, out sourceLine))
            {
                return true;
            }
        }

        foreach (var value in input.Values)
        {
            if (TryGetJsonString(value, out sourceLine) && sourceLine.Length == AyKodluIbanLineLength)
            {
                return true;
            }
        }

        sourceLine = string.Empty;
        return false;
    }

    private static bool IsFixedWidthSourceField(string? sourceField)
    {
        var fixedWidthSourceKeys = new[] { "line", "satir", "satır", "rawLine", "record", "row", "fixedWidthLine", "data" };
        var sourceFields = GetSourceFieldNames(sourceField);

        return sourceFields.Count > 0
            && sourceFields.All(source => fixedWidthSourceKeys.Contains(source, StringComparer.OrdinalIgnoreCase));
    }

    private static bool TryGetJsonString(JsonElement value, out string text)
    {
        if (value.ValueKind == JsonValueKind.String)
        {
            text = value.GetString() ?? string.Empty;
            return !string.IsNullOrEmpty(text);
        }

        text = string.Empty;
        return false;
    }

    private static void ApplyTargetFieldFormats(
        IDictionary<string, object?> output,
        TargetSchemaDocument targetSchema,
        ISet<string> mappedTargets,
        ISet<string> skipFormattingFields,
        bool ayKodluIbanPatternApplied,
        ICollection<string> warnings,
        ICollection<string> errors)
    {
        foreach (var field in targetSchema.Fields)
        {
            if (!mappedTargets.Contains(field.Name))
            {
                output.Remove(field.Name);
                continue;
            }

            if (!output.TryGetValue(field.Name, out var value))
            {
                if (field.FixedValue is not null)
                {
                    output[field.Name] = FormatTargetFieldValue(null, field, warnings, errors);
                    continue;
                }

                if (field.Required && (!ayKodluIbanPatternApplied || IsAyKodluIbanTargetField(field.Name)))
                {
                    errors.Add($"Required target field '{field.Name}' has no mapped value.");
                }

                continue;
            }

            if (skipFormattingFields.Contains(field.Name) || !HasTargetFormatting(field))
            {
                continue;
            }

            output[field.Name] = FormatTargetFieldValue(value, field, warnings, errors);
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
        ICollection<string> warnings,
        ICollection<string> errors)
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
            ? ApplyFixedLength(text, field, errors)
            : text;
    }

    private static string ApplyFixedLength(
        string value,
        TargetFieldDocument field,
        ICollection<string> errors)
    {
        var length = field.Length!.Value;
        var normalizedValue = value;

        if (normalizedValue.Length > length)
        {
            errors.Add($"Target field '{field.Name}' expects length {length} but received value of length {normalizedValue.Length}. Value was not truncated.");
            return normalizedValue;
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

    private static void ConcatSourceValues(
        IReadOnlyDictionary<string, JsonElement> input,
        IDictionary<string, object?> output,
        ICollection<string> warnings,
        string sourceField,
        string targetField)
    {
        var sourceFields = GetSourceFieldNames(sourceField);
        if (sourceFields.Count == 0)
        {
            warnings.Add($"Source field is empty for target field '{targetField}'.");
            return;
        }

        var textParts = new List<string>();
        foreach (var fieldName in sourceFields)
        {
            if (!input.TryGetValue(fieldName, out var value))
            {
                warnings.Add($"Source field '{fieldName}' was not found in input.");
                continue;
            }

            textParts.Add(JsonElementToText(value));
        }

        output[targetField] = string.Join(" ", textParts.Where(text => !string.IsNullOrEmpty(text)));
    }

    private static void FormatSourceDate(
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

        output[targetField] = FormatDateValue(value, JsonElementToText(value), targetField, warnings);
    }

    private static void TransformSourceText(
        IReadOnlyDictionary<string, JsonElement> input,
        IDictionary<string, object?> output,
        ICollection<string> warnings,
        string sourceField,
        string targetField,
        Func<string, string> transform)
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

        output[targetField] = transform(JsonElementToText(value));
    }

    private static IReadOnlyList<string> GetSourceFieldNames(string? sourceField)
    {
        return (sourceField ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(fieldName => !string.IsNullOrWhiteSpace(fieldName))
            .ToList();
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

    private sealed record FixedWidthTargetField(string Name, int StartPosition, int Length);
}
