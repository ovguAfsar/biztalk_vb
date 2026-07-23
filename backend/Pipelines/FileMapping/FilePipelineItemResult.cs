using MappingStudio.Api.DTOs;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class FilePipelineItemResult
{
    public required string FileName { get; init; }

    public required bool Success { get; init; }

    public TestMappingResponse? Response { get; init; }

    public required IReadOnlyList<string> Errors { get; init; }
}
