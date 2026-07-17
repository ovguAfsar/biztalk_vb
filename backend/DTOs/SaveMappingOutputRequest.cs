using System.Text.Json;

namespace MappingStudio.Api.DTOs;

public sealed class SaveMappingOutputRequest
{
    public JsonElement? Output { get; init; }

    public DateTime? GeneratedAt { get; init; }
}
