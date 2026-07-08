namespace MappingStudio.Api.DTOs;

public sealed class SaveMappingsResponse
{
    public required string Id { get; init; }

    public required IReadOnlyList<MappingDefinitionDto> Mappings { get; init; }

    public required IReadOnlyList<string> Warnings { get; init; }

    public required DateTime UpdatedAt { get; init; }
}
