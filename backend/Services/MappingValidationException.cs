namespace MappingStudio.Api.Services;

public sealed class MappingValidationException : Exception
{
    public MappingValidationException(IDictionary<string, string[]> errors)
        : base("Mapping request validation failed.")
    {
        Errors = errors;
    }

    public IDictionary<string, string[]> Errors { get; }
}

