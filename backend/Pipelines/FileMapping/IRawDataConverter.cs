using System.Text.Json;

namespace MappingStudio.Api.Pipelines.FileMapping;

public interface IRawDataConverter
{
    JsonElement Convert(string rawData);
}