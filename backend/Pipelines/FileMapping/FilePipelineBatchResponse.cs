namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class FilePipelineBatchResponse
{
    public required int Total { get; init; }

    public required int Succeeded { get; init; }

    public required int Failed { get; init; }

    public required IReadOnlyList<FilePipelineItemResult> Files { get; init; }
}
