namespace MappingStudio.Api.DTOs;

public sealed class SaveSourceSchemaRequest
{
    public string? SourceName { get; init; }

    public IReadOnlyList<SourceFieldDto>? Fields { get; init; }
}

