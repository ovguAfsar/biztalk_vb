namespace MappingStudio.Api.DTOs;

public sealed class CreateMappingRequest
{
    public string? Name { get; init; }

    public string? Description { get; init; }

    public string? Institution { get; init; }

    public string? TemplateMappingId { get; init; }

    public string? SourceType { get; init; }

    public string? TargetType { get; init; }

    public string? PatternType { get; init; }

    public PatternSettingsDto? PatternSettings { get; init; }
}
