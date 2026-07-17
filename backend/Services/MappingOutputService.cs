using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using MappingStudio.Api.DTOs;
using MappingStudio.Api.Models;
using MappingStudio.Api.Repositories;
using MongoDB.Bson;

namespace MappingStudio.Api.Services;

public sealed class MappingOutputService : IMappingOutputService
{
    private readonly IMappingRepository _mappingRepository;
    private readonly IMappingOutputRepository _outputRepository;

    public MappingOutputService(IMappingRepository mappingRepository, IMappingOutputRepository outputRepository)
    {
        _mappingRepository = mappingRepository;
        _outputRepository = outputRepository;
    }

    public async Task<MappingOutputResponse> SaveAsync(
        string mappingId,
        SaveMappingOutputRequest? request,
        CancellationToken cancellationToken)
    {
        if (!ObjectId.TryParse(mappingId, out _))
        {
            throw new MappingValidationException(new Dictionary<string, string[]>
            {
                ["mappingId"] = ["Mapping id gecersiz."]
            });
        }

        if (request?.Output is null || request.Output.Value.ValueKind is JsonValueKind.Undefined)
        {
            throw new MappingValidationException(new Dictionary<string, string[]>
            {
                ["output"] = ["Kaydedilecek JSON ciktisi zorunludur."]
            });
        }

        if (request.GeneratedAt is null)
        {
            throw new MappingValidationException(new Dictionary<string, string[]>
            {
                ["generatedAt"] = ["Ciktinin uretilme zamani zorunludur."]
            });
        }

        if (await _mappingRepository.GetByIdAsync(mappingId, cancellationToken) is null)
        {
            throw new MappingNotFoundException(mappingId);
        }

        var canonicalJson = Canonicalize(request.Output.Value);
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(canonicalJson))).ToLowerInvariant();
        var document = new MappingOutputDocument
        {
            Id = ObjectId.GenerateNewId().ToString(),
            MappingId = mappingId,
            OutputJson = canonicalJson,
            OutputHash = hash,
            GeneratedAt = request.GeneratedAt.Value.ToUniversalTime(),
            SavedAt = DateTime.UtcNow
        };

        var result = await _outputRepository.CreateOrGetAsync(document, cancellationToken);
        using var parsedOutput = JsonDocument.Parse(result.Output.OutputJson);
        return new MappingOutputResponse
        {
            Id = result.Output.Id,
            MappingId = result.Output.MappingId,
            Output = parsedOutput.RootElement.Clone(),
            GeneratedAt = result.Output.GeneratedAt,
            SavedAt = result.Output.SavedAt,
            AlreadyExists = !result.Created
        };
    }

    private static string Canonicalize(JsonElement element)
    {
        using var stream = new MemoryStream();
        using (var writer = new Utf8JsonWriter(stream))
        {
            WriteCanonical(writer, element);
        }
        return Encoding.UTF8.GetString(stream.ToArray());
    }

    private static void WriteCanonical(Utf8JsonWriter writer, JsonElement element)
    {
        switch (element.ValueKind)
        {
            case JsonValueKind.Object:
                writer.WriteStartObject();
                foreach (var property in element.EnumerateObject().OrderBy(property => property.Name, StringComparer.Ordinal))
                {
                    writer.WritePropertyName(property.Name);
                    WriteCanonical(writer, property.Value);
                }
                writer.WriteEndObject();
                break;
            case JsonValueKind.Array:
                writer.WriteStartArray();
                foreach (var item in element.EnumerateArray()) WriteCanonical(writer, item);
                writer.WriteEndArray();
                break;
            default:
                element.WriteTo(writer);
                break;
        }
    }
}
