using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MappingStudio.Api.Models;

[BsonIgnoreExtraElements]
public sealed class MappingOutputDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string Id { get; init; }

    [BsonElement("mappingId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public required string MappingId { get; init; }

    [BsonElement("outputJson")]
    public required string OutputJson { get; init; }

    [BsonElement("outputHash")]
    public required string OutputHash { get; init; }

    [BsonElement("generatedAt")]
    public required DateTime GeneratedAt { get; init; }

    [BsonElement("savedAt")]
    public required DateTime SavedAt { get; init; }
}
