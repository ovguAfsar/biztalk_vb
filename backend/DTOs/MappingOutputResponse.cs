using System.Text.Json;

namespace MappingStudio.Api.DTOs;

public sealed class MappingOutputResponse
{
    public required string Id { get; init; }
    public required string MappingId { get; init; }
    public required JsonElement Output { get; init; }
    public required DateTime GeneratedAt { get; init; }
    public required DateTime SavedAt { get; init; }
    public required bool AlreadyExists { get; init; }
}
