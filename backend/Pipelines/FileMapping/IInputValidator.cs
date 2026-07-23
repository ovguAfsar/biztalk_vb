using System.Text.Json;

namespace MappingStudio.Api.Pipelines.FileMapping;

public interface IInputValidator
{
    void Validate(JsonElement input);
}