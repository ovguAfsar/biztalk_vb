namespace MappingStudio.Api.DTOs;

public sealed class SaveSourceSchemaRequest
{
    public string? SourceName { get; init; }

    public string? SourceType { get; init; }

    public IReadOnlyList<SourceFieldDto>? Fields { get; init; }

    public IReadOnlyList<Dictionary<string, string?>>? Records { get; init; }
}
