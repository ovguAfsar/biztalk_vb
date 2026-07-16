using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MappingStudio.Api.Models;

[BsonIgnoreExtraElements]
public sealed class MappingDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; init; }

    [BsonElement("name")]
    public required string Name { get; init; }

    [BsonElement("description")]
    public string? Description { get; init; }

    [BsonElement("institution")]
    public string? Institution { get; init; }

    [BsonElement("sourceType")]
    public required string SourceType { get; init; }

    [BsonElement("targetType")]
    public required string TargetType { get; init; }

    [BsonElement("patternType")]
    public string? PatternType { get; init; }

    [BsonElement("patternSettings")]
    public PatternSettingsDocument? PatternSettings { get; init; }

    [BsonElement("status")]
    public required string Status { get; init; }

    [BsonElement("sourceSchema")]
    public SourceSchemaDocument? SourceSchema { get; init; }

    [BsonElement("targetSchema")]
    public TargetSchemaDocument? TargetSchema { get; init; }

    [BsonElement("mappingDefinitions")]
    public List<MappingDefinitionDocument>? MappingDefinitions { get; init; }

    [BsonElement("createdAt")]
    public required DateTime CreatedAt { get; init; }

    [BsonElement("updatedAt")]
    public required DateTime UpdatedAt { get; init; }
}

public sealed class PatternSettingsDocument
{
    [BsonElement("mtvHeader")]
    public MtvHeaderSettingsDocument? MtvHeader { get; init; }

    [BsonElement("tosHeader")]
    public TosHeaderSettingsDocument? TosHeader { get; init; }
}

public sealed class MtvHeaderSettingsDocument
{
    [BsonElement("subeKodu")]
    public string? SubeKodu { get; init; }

    [BsonElement("kurumKodu")]
    public string? KurumKodu { get; init; }

    [BsonElement("dosyaTarihi")]
    public string? DosyaTarihi { get; init; }

    [BsonElement("kurumHesapNo")]
    public string? KurumHesapNo { get; init; }
}

public sealed class TosHeaderSettingsDocument
{
    [BsonElement("subeKodu")]
    public string? SubeKodu { get; init; }

    [BsonElement("kurumKodu")]
    public string? KurumKodu { get; init; }

    [BsonElement("dosyaTarihi")]
    public string? DosyaTarihi { get; init; }

    [BsonElement("kurumHesapNo")]
    public string? KurumHesapNo { get; init; }
}

public sealed class SourceSchemaDocument
{
    [BsonElement("sourceName")]
    public required string SourceName { get; init; }

    [BsonElement("fields")]
    public required List<SourceFieldDocument> Fields { get; init; }

    [BsonElement("records")]
    public List<Dictionary<string, string?>>? Records { get; init; }
}

public sealed class SourceFieldDocument
{
    [BsonElement("name")]
    public required string Name { get; init; }

    [BsonElement("displayName")]
    public string? DisplayName { get; init; }

    [BsonElement("type")]
    public required string Type { get; init; }

    [BsonElement("required")]
    public required bool Required { get; init; }

    [BsonElement("sampleValue")]
    public string? SampleValue { get; init; }

    [BsonElement("startPosition")]
    public int? StartPosition { get; init; }

    [BsonElement("endPosition")]
    public int? EndPosition { get; init; }

    [BsonElement("length")]
    public int? Length { get; init; }
}

public sealed class TargetSchemaDocument
{
    [BsonElement("targetName")]
    public required string TargetName { get; init; }

    [BsonElement("fields")]
    public required List<TargetFieldDocument> Fields { get; init; }
}

public sealed class TargetFieldDocument
{
    [BsonElement("name")]
    public required string Name { get; init; }

    [BsonElement("displayName")]
    public string? DisplayName { get; init; }

    [BsonElement("type")]
    public required string Type { get; init; }

    [BsonElement("required")]
    public required bool Required { get; init; }

    [BsonElement("sampleValue")]
    public string? SampleValue { get; init; }

    [BsonElement("length")]
    public int? Length { get; init; }

    [BsonElement("startPosition")]
    public int? StartPosition { get; init; }

    [BsonElement("format")]
    public string? Format { get; init; }

    [BsonElement("align")]
    public string? Align { get; init; }

    [BsonElement("padChar")]
    public string? PadChar { get; init; }

    [BsonElement("fixedValue")]
    public string? FixedValue { get; init; }

    [BsonElement("requiredForOutput")]
    public bool RequiredForOutput { get; init; }
}

public sealed class MappingDefinitionDocument
{
    [BsonElement("sourceField")]
    public required string SourceField { get; init; }

    [BsonElement("targetField")]
    public required string TargetField { get; init; }

    [BsonElement("transformType")]
    public required string TransformType { get; init; }
}
