using System.Text.Json;

namespace MappingStudio.Api.DTOs;

public sealed class TestMappingRequest
{
    public JsonElement? Input { get; init; }
}
