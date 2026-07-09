namespace MappingStudio.Api.DTOs;

public sealed class SourceFieldDto
{
    public string? Name { get; init; }

    public string? DisplayName { get; init; }

    public string? Type { get; init; }

    public bool Required { get; init; }

    public string? SampleValue { get; init; }

    public int? StartPosition { get; init; }

    public int? EndPosition { get; init; }

    public int? Length { get; init; }
}
