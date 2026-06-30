using System.ComponentModel.DataAnnotations;

namespace MappingStudio.Api.Options;

public sealed class MongoDbOptions
{
    public const string SectionName = "MongoDb";

    [Required]
    public string ConnectionString { get; init; } = string.Empty;

    [Required]
    public string DatabaseName { get; init; } = string.Empty;

    [Required]
    public string MappingsCollectionName { get; init; } = "mappings";
}

