namespace MappingStudio.Api.DTOs;

public sealed class SaveTargetSchemaRequest
{
    public string? TargetName { get; init; }

    public IReadOnlyList<TargetFieldDto>? Fields { get; init; }
}
