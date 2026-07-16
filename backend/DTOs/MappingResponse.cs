namespace MappingStudio.Api.DTOs;

public sealed class MappingResponse
{
    public required string Id { get; init; }

    public required string Name { get; init; }

    public string? Description { get; init; }

    public string? Institution { get; init; }

    public required string SourceType { get; init; }

    public required string TargetType { get; init; }

    public required string PatternType { get; init; }

    public PatternSettingsDto? PatternSettings { get; init; }

    public required string Status { get; init; }

    public SourceSchemaDetails? SourceSchema { get; init; }

    public TargetSchemaDetails? TargetSchema { get; init; }

    public IReadOnlyList<MappingDefinitionDto>? MappingDefinitions { get; init; }

    public required DateTime CreatedAt { get; init; }

    public required DateTime UpdatedAt { get; init; }
}
