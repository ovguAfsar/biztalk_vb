namespace MappingStudio.Api.DTOs;

public sealed class SourceSchemaDetails
{
    public required string SourceName { get; init; }

    public required IReadOnlyList<SourceFieldDto> Fields { get; init; }

    public IReadOnlyList<Dictionary<string, string?>>? Records { get; init; }
}
