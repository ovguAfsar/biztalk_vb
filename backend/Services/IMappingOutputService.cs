using MappingStudio.Api.DTOs;

namespace MappingStudio.Api.Services;

public interface IMappingOutputService
{
    Task<MappingOutputResponse> SaveAsync(
        string mappingId,
        SaveMappingOutputRequest? request,
        CancellationToken cancellationToken);
}
