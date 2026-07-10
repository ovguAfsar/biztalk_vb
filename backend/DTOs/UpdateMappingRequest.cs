namespace MappingStudio.Api.DTOs;

public sealed class UpdateMappingRequest
{
    public string? Name { get; init; }

    public string? Description { get; init; }

    public string? SourceType { get; init; }

    public string? TargetType { get; init; }

    public string? PatternType { get; init; }

    public PatternSettingsDto? PatternSettings { get; init; }

    public string? Status { get; init; }
}
