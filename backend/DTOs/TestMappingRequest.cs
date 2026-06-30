using System.Text.Json;

namespace MappingStudio.Api.DTOs;

public sealed class TestMappingRequest
{
    public Dictionary<string, JsonElement>? Input { get; init; }
}
