using MappingStudio.Api.DTOs;

namespace MappingStudio.Api.Pipelines.FileMapping;

public interface IFileMappingPipeline
{
    Task<TestMappingResponse> RunAsync(
        string mappingId,
        CancellationToken cancellationToken);

    Task<FilePipelineBatchResponse> RunAllAsync(
        string mappingId,
        CancellationToken cancellationToken);
}
