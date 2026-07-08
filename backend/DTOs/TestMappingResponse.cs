namespace MappingStudio.Api.DTOs;

public sealed class TestMappingResponse
{
    public required string Id { get; init; }

    public required IReadOnlyList<IReadOnlyDictionary<string, object?>> Output { get; init; }

    public required IReadOnlyList<string> Warnings { get; init; }

    public required IReadOnlyList<string> Errors { get; init; }
}
