namespace MappingStudio.Api.DTOs;

public sealed class SaveMappingsRequest
{
    public IReadOnlyList<MappingDefinitionDto>? Mappings { get; init; }
}
