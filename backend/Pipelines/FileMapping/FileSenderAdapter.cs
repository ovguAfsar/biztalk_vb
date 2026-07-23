using System.Text.Json;
using MappingStudio.Api.Options;
using Microsoft.Extensions.Options;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class FileSenderAdapter : ISenderAdapter
{
    private readonly string _outputFilePath;

    public FileSenderAdapter(
        IOptions<FilePipelineOptions> options,
        IHostEnvironment environment)
    {
        _outputFilePath = Path.GetFullPath(
            options.Value.OutputFilePath,
            environment.ContentRootPath);
    }

    public async Task SendAsync(
        object output,
        CancellationToken cancellationToken)
    {
        await WriteAsync(_outputFilePath, output, cancellationToken);
    }

    public async Task SendAsync(
        string sourceFileName,
        object output,
        CancellationToken cancellationToken)
    {
        string outputDirectory = Path.GetDirectoryName(_outputFilePath)
            ?? throw new InvalidOperationException(
                "Pipeline output directory could not be resolved.");

        string safeFileName = Path.GetFileNameWithoutExtension(sourceFileName);
        string outputFilePath = Path.Combine(
            outputDirectory,
            $"{safeFileName}.output.json");

        await WriteAsync(outputFilePath, output, cancellationToken);
    }

    private static async Task WriteAsync(
        string outputFilePath,
        object output,
        CancellationToken cancellationToken)
    {
        string? outputDirectory = Path.GetDirectoryName(outputFilePath);

        if (!string.IsNullOrWhiteSpace(outputDirectory))
        {
            Directory.CreateDirectory(outputDirectory);
        }

        await using FileStream stream = File.Create(outputFilePath);

        await JsonSerializer.SerializeAsync(
            stream,
            output,
            output.GetType(),
            new JsonSerializerOptions
            {
                WriteIndented = true
            },
            cancellationToken);
    }
}
