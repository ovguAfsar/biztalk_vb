using System.Text.Json;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class JsonInputValidator : IInputValidator
{
    public void Validate(JsonElement input)
    {
        var errors = new List<string>();

        if (input.ValueKind is JsonValueKind.Null or JsonValueKind.Undefined)
        {
            errors.Add("Input cannot be null.");
        }
        else if (input.ValueKind == JsonValueKind.Object)
        {
            if (!input.EnumerateObject().Any())
            {
                errors.Add("Input object cannot be empty.");
            }
        }
        else if (input.ValueKind == JsonValueKind.Array)
        {
            JsonElement[] records = input.EnumerateArray().ToArray();

            if (records.Length == 0)
            {
                errors.Add("Input array must contain at least one record.");
            }

            for (var index = 0; index < records.Length; index++)
            {
                JsonElement record = records[index];

                if (record.ValueKind != JsonValueKind.Object)
                {
                    errors.Add($"Record {index + 1} must be a JSON object.");
                    continue;
                }

                if (!record.EnumerateObject().Any())
                {
                    errors.Add($"Record {index + 1} cannot be empty.");
                }
            }
        }
        else
        {
            errors.Add("Input must be a JSON object or an array of JSON objects.");
        }

        if (errors.Count > 0)
        {
            throw new InputValidationException(errors);
        }
    }
}
