using MappingStudio.Api.Models;
using MappingStudio.Api.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MappingStudio.Api.Repositories;

public sealed class MappingOutputRepository : IMappingOutputRepository
{
    private readonly IMongoCollection<MappingOutputDocument> _outputs;

    public MappingOutputRepository(IMongoDatabase database, IOptions<MongoDbOptions> options)
    {
        _outputs = database.GetCollection<MappingOutputDocument>(options.Value.MappingOutputsCollectionName);
        _outputs.Indexes.CreateOne(new CreateIndexModel<MappingOutputDocument>(
            Builders<MappingOutputDocument>.IndexKeys
                .Ascending(output => output.MappingId)
                .Ascending(output => output.OutputHash),
            new CreateIndexOptions { Name = "ux_mappingId_outputHash", Unique = true }));
        _outputs.Indexes.CreateOne(new CreateIndexModel<MappingOutputDocument>(
            Builders<MappingOutputDocument>.IndexKeys
                .Ascending(output => output.MappingId)
                .Descending(output => output.GeneratedAt),
            new CreateIndexOptions { Name = "idx_mappingId_generatedAt" }));
    }

    public async Task<(MappingOutputDocument Output, bool Created)> CreateOrGetAsync(
        MappingOutputDocument output,
        CancellationToken cancellationToken)
    {
        try
        {
            await _outputs.InsertOneAsync(output, cancellationToken: cancellationToken);
            return (output, true);
        }
        catch (MongoWriteException exception) when (exception.WriteError?.Category == ServerErrorCategory.DuplicateKey)
        {
            var filter = Builders<MappingOutputDocument>.Filter.And(
                Builders<MappingOutputDocument>.Filter.Eq(item => item.MappingId, output.MappingId),
                Builders<MappingOutputDocument>.Filter.Eq(item => item.OutputHash, output.OutputHash));
            var existing = await _outputs.Find(filter).FirstAsync(cancellationToken);
            return (existing, false);
        }
    }
}
