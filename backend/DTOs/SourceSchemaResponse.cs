namespace MappingStudio.Api.DTOs;

public sealed class SourceSchemaResponse
{
    public required string Id { get; init; }

    public required string SourceName { get; init; }

    public required string SourceType { get; init; }

    public required IReadOnlyList<SourceFieldDto> Fields { get; init; }

    public IReadOnlyList<Dictionary<string, string?>>? Records { get; init; }

    public required DateTime UpdatedAt { get; init; }
}
