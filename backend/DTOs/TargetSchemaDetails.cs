namespace MappingStudio.Api.DTOs;

public sealed class TargetSchemaDetails
{
    public required string TargetName { get; init; }

    public required IReadOnlyList<TargetFieldDto> Fields { get; init; }
}
