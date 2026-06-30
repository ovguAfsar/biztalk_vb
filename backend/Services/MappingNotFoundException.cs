namespace MappingStudio.Api.Services;

public sealed class MappingNotFoundException : Exception
{
    public MappingNotFoundException(string id)
        : base($"Mapping '{id}' was not found.")
    {
        Id = id;
    }

    public string Id { get; }
}
