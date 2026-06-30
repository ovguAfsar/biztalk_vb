namespace MappingStudio.Api.DTOs;

public sealed class TargetFieldDto
{
    public string? Name { get; init; }

    public string? DisplayName { get; init; }

    public string? Type { get; init; }

    public bool Required { get; init; }

    public string? SampleValue { get; init; }
}
