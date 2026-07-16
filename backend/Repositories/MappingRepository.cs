using MappingStudio.Api.Models;
using MappingStudio.Api.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MappingStudio.Api.Repositories;

public sealed class MappingRepository : IMappingRepository
{
    private readonly IMongoCollection<MappingDocument> _mappings;

    public MappingRepository(IMongoDatabase database, IOptions<MongoDbOptions> options)
    {
        _mappings = database.GetCollection<MappingDocument>(options.Value.MappingsCollectionName);
        _mappings.Indexes.CreateOne(new CreateIndexModel<MappingDocument>(
            Builders<MappingDocument>.IndexKeys.Ascending(mapping => mapping.PatternType),
            new CreateIndexOptions { Name = "idx_patternType" }));
    }

    public Task CreateAsync(MappingDocument mapping, CancellationToken cancellationToken)
    {
        return _mappings.InsertOneAsync(mapping, cancellationToken: cancellationToken);
    }

    public async Task<IReadOnlyList<MappingDocument>> GetAllAsync(string? patternType, CancellationToken cancellationToken)
    {
        var filter = BuildPatternTypeFilter(patternType);
        return await _mappings
            .Find(filter)
            .SortByDescending(mapping => mapping.UpdatedAt)
            .ToListAsync(cancellationToken);
    }

    private static FilterDefinition<MappingDocument> BuildPatternTypeFilter(string? patternType)
    {
        var normalizedPatternType = string.IsNullOrWhiteSpace(patternType)
            ? null
            : patternType.Trim().ToLowerInvariant();
        var filter = Builders<MappingDocument>.Filter;

        return normalizedPatternType switch
        {
            "maas" => filter.Or(
                filter.Eq(mapping => mapping.PatternType, "maas"),
                filter.Eq(mapping => mapping.PatternType, null),
                filter.Exists(mapping => mapping.PatternType, false)),
            "tos" => filter.Eq(mapping => mapping.PatternType, "tos"),
            "mtv" or "vergi_mtv" => filter.Or(
                filter.Eq(mapping => mapping.PatternType, "mtv"),
                filter.Eq(mapping => mapping.PatternType, "vergi_mtv")),
            "vergi_gumruk" => filter.Eq(mapping => mapping.PatternType, "vergi_gumruk"),
            "vergi_toplu" => filter.Eq(mapping => mapping.PatternType, "vergi_toplu"),
            _ => filter.Empty
        };
    }

    public async Task<MappingDocument?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        return await _mappings.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        var result = await _mappings.DeleteOneAsync(filter, cancellationToken);
        return result.DeletedCount > 0;
    }

    public async Task<MappingDocument?> UpdateAsync(
        string id,
        string name,
        string? description,
        string? institution,
        bool isTemplate,
        string sourceType,
        string targetType,
        string patternType,
        PatternSettingsDocument? patternSettings,
        string status,
        DateTime updatedAt,
        CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        var update = Builders<MappingDocument>.Update
            .Set(mapping => mapping.Name, name)
            .Set(mapping => mapping.Description, description)
            .Set(mapping => mapping.Institution, institution)
            .Set(mapping => mapping.IsTemplate, isTemplate)
            .Set(mapping => mapping.SourceType, sourceType)
            .Set(mapping => mapping.TargetType, targetType)
            .Set(mapping => mapping.PatternType, patternType)
            .Set(mapping => mapping.PatternSettings, patternSettings)
            .Set(mapping => mapping.Status, status)
            .Set(mapping => mapping.UpdatedAt, updatedAt);

        return await _mappings.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<MappingDocument>
            {
                ReturnDocument = ReturnDocument.After
            },
            cancellationToken);
    }

    public async Task<MappingDocument?> SaveSourceSchemaAsync(
        string id,
        SourceSchemaDocument sourceSchema,
        string? sourceType,
        DateTime updatedAt,
        CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        var update = Builders<MappingDocument>.Update
            .Set(mapping => mapping.SourceSchema, sourceSchema)
            .Set(mapping => mapping.UpdatedAt, updatedAt);

        if (!string.IsNullOrWhiteSpace(sourceType))
        {
            update = update.Set(mapping => mapping.SourceType, sourceType.Trim().ToLowerInvariant());
        }

        return await _mappings.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<MappingDocument>
            {
                ReturnDocument = ReturnDocument.After
            },
            cancellationToken);
    }

    public async Task<MappingDocument?> SaveTargetSchemaAsync(
        string id,
        TargetSchemaDocument targetSchema,
        DateTime updatedAt,
        CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        var update = Builders<MappingDocument>.Update
            .Set(mapping => mapping.TargetSchema, targetSchema)
            .Set(mapping => mapping.UpdatedAt, updatedAt);

        return await _mappings.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<MappingDocument>
            {
                ReturnDocument = ReturnDocument.After
            },
            cancellationToken);
    }

    public async Task<MappingDocument?> SaveMappingDefinitionsAsync(
        string id,
        IReadOnlyList<MappingDefinitionDocument> mappingDefinitions,
        DateTime updatedAt,
        CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        var update = Builders<MappingDocument>.Update
            .Set(mapping => mapping.MappingDefinitions, mappingDefinitions.ToList())
            .Set(mapping => mapping.UpdatedAt, updatedAt);

        return await _mappings.FindOneAndUpdateAsync(
            filter,
            update,
            new FindOneAndUpdateOptions<MappingDocument>
            {
                ReturnDocument = ReturnDocument.After
            },
            cancellationToken);
    }
}
