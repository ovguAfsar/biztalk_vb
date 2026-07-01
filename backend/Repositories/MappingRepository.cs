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
    }

    public Task CreateAsync(MappingDocument mapping, CancellationToken cancellationToken)
    {
        return _mappings.InsertOneAsync(mapping, cancellationToken: cancellationToken);
    }

    public async Task<MappingDocument?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var filter = Builders<MappingDocument>.Filter.Eq(mapping => mapping.Id, id);
        return await _mappings.Find(filter).FirstOrDefaultAsync(cancellationToken);
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
