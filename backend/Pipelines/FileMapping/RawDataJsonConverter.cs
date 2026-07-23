using System.Text.Json;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class RawDataJsonConverter : IRawDataConverter
{
    public JsonElement Convert(string rawData)
    {
        if (string.IsNullOrWhiteSpace(rawData))
        {
            throw new ArgumentException(
                "Raw data cannot be empty.",
                nameof(rawData));

        }

        using JsonDocument document = JsonDocument.Parse(rawData);

        return document.RootElement.Clone();
    }
}
