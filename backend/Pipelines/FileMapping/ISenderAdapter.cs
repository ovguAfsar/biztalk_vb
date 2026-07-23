namespace MappingStudio.Api.Pipelines.FileMapping;

public interface ISenderAdapter
{
    Task SendAsync(object output, CancellationToken cancellationToken);

    Task SendAsync(
        string sourceFileName,
        object output,
        CancellationToken cancellationToken);
}
