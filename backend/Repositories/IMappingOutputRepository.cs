using MappingStudio.Api.Models;

namespace MappingStudio.Api.Repositories;

public interface IMappingOutputRepository
{
    Task<(MappingOutputDocument Output, bool Created)> CreateOrGetAsync(
        MappingOutputDocument output,
        CancellationToken cancellationToken);
}
