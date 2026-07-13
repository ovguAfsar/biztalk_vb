namespace MappingStudio.Api.DTOs;

public sealed class AiMappingSuggestionRequest
{
    public string? PatternType { get; init; }

    public IReadOnlyList<AiMappingFieldDto>? SourceFields { get; init; }

    public IReadOnlyList<AiMappingFieldDto>? TargetFields { get; init; }
}

public sealed class AiMappingFieldDto
{
    public string? Name { get; init; }

    public string? DisplayName { get; init; }

    public string? Type { get; init; }
}

public sealed class AiMappingSuggestionResponse
{
    public bool IsAvailable { get; init; }

    public string? Message { get; init; }

    public IReadOnlyList<AiMappingSuggestionDto> Suggestions { get; init; } = Array.Empty<AiMappingSuggestionDto>();
}

public sealed class AiMappingSuggestionDto
{
    public required string SourceField { get; init; }

    public required string TargetField { get; init; }

    public double? Confidence { get; init; }

    public string? Reason { get; init; }
}
