namespace MappingStudio.Api.DTOs;

public sealed class TargetFieldDto
{
    public string? Name { get; init; }

    public string? DisplayName { get; init; }

    public string? Type { get; init; }

    public bool Required { get; init; }

    public string? SampleValue { get; init; }

    public int? Length { get; init; }

    public int? StartPosition { get; init; }

    public string? Format { get; init; }

    public string? Align { get; init; }

    public string? PadChar { get; init; }

    public string? FixedValue { get; init; }

    public bool RequiredForOutput { get; init; }
}
