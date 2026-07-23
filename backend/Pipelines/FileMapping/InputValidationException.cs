namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class InputValidationException : Exception
{
    public InputValidationException(IEnumerable<string> errors)
        : base("Pipeline input validation failed.")
    {
        Errors = errors.ToArray();
    }

    public IReadOnlyList<string> Errors { get; }
}