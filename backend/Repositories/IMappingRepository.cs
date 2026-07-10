using MappingStudio.Api.Models;

namespace MappingStudio.Api.Repositories;

public interface IMappingRepository
{
    Task CreateAsync(MappingDocument mapping, CancellationToken cancellationToken);

    Task<IReadOnlyList<MappingDocument>> GetAllAsync(string? patternType, CancellationToken cancellationToken);

    Task<MappingDocument?> GetByIdAsync(string id, CancellationToken cancellationToken);

    Task<MappingDocument?> UpdateAsync(
        string id,
        string name,
        string? description,
        string sourceType,
        string targetType,
        string patternType,
        PatternSettingsDocument? patternSettings,
        string status,
        DateTime updatedAt,
        CancellationToken cancellationToken);

    Task<MappingDocument?> SaveSourceSchemaAsync(
        string id,
        SourceSchemaDocument sourceSchema,
        string? sourceType,
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
