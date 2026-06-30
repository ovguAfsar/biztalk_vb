using MappingStudio.Api.DTOs;

namespace MappingStudio.Api.Services;

public interface IMappingService
{
    Task<MappingResponse> CreateAsync(CreateMappingRequest? request, CancellationToken cancellationToken);

    Task<MappingResponse> GetByIdAsync(string id, CancellationToken cancellationToken);

    Task<SourceSchemaResponse> SaveSourceSchemaAsync(
        string id,
        SaveSourceSchemaRequest? request,
        CancellationToken cancellationToken);

    Task<TargetSchemaResponse> SaveTargetSchemaAsync(
        string id,
        SaveTargetSchemaRequest? request,
        CancellationToken cancellationToken);

    Task<SaveMappingsResponse> SaveMappingsAsync(
        string id,
        SaveMappingsRequest? request,
        CancellationToken cancellationToken);

    Task<TestMappingResponse> TestMappingAsync(
        string id,
        TestMappingRequest? request,
        CancellationToken cancellationToken);
}
