namespace MappingStudio.Api.Options;
public sealed class FilePipelineOptions
{
    public const string SectionName = "FilePipeline";

    public required string InputFilePath { get; init; }
    
    public required string OutputFilePath { get; init; }
}