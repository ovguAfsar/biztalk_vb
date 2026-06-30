using MappingStudio.Api.Models;

namespace MappingStudio.Api.Repositories;

public interface IMappingRepository
{
    Task CreateAsync(MappingDocument mapping, CancellationToken cancellationToken);

    Task<MappingDocument?> GetByIdAsync(string id, CancellationToken cancellationToken);

    Task<MappingDocument?> SaveSourceSchemaAsync(
        string id,
        SourceSchemaDocument sourceSchema,
        DateTime updatedAt,
        CancellationToken cancellationToken);

    Task<MappingDocument?> SaveTargetSchemaAsync(
        string id,
        TargetSchemaDocument targetSchema,
        DateTime updatedAt,
        CancellationToken cancellationToken);

    Task<MappingDocument?> SaveMappingDefinitionsAsync(
        string id,
        IReadOnlyList<MappingDefinitionDocument> mappingDefinitions,
        DateTime updatedAt,
        CancellationToken cancellationToken);
}
