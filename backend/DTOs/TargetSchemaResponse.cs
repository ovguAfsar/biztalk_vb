namespace MappingStudio.Api.DTOs;

public sealed class TargetSchemaResponse
{
    public required string Id { get; init; }

    public required string TargetName { get; init; }

    public required string TargetType { get; init; }

    public required IReadOnlyList<TargetFieldDto> Fields { get; init; }

    public required DateTime UpdatedAt { get; init; }
}
