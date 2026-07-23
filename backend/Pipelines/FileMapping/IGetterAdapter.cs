namespace MappingStudio.Api.Pipelines.FileMapping;

public interface IGetterAdapter
{
    Task<string> GetDataAsync(CancellationToken cancellationToken);

    Task<IReadOnlyList<PipelineInputFile>> GetFilesAsync(
        CancellationToken cancellationToken);
}
