namespace MappingStudio.Api.DTOs;

public sealed class MappingDefinitionDto
{
    public string? SourceField { get; init; }

    public string? TargetField { get; init; }

    public string? TransformType { get; init; }
}
