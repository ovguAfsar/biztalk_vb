using MappingStudio.Api.Options;
using Microsoft.Extensions.Options;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class FileGetterAdapter : IGetterAdapter
{
    private readonly string _inputFilePath;

    public FileGetterAdapter(
        IOptions<FilePipelineOptions> options,
        IHostEnvironment environment)
    {
        _inputFilePath = Path.GetFullPath(
            options.Value.InputFilePath,
            environment.ContentRootPath);
    }

    public async Task<string> GetDataAsync(
        CancellationToken cancellationToken)
    {
        if (!File.Exists(_inputFilePath))
        {
            throw new FileNotFoundException(
                "Pipeline input file was not found.",
                _inputFilePath);
        }
        return await File.ReadAllTextAsync(
            _inputFilePath,
            cancellationToken);
    }

    public async Task<IReadOnlyList<PipelineInputFile>> GetFilesAsync(
        CancellationToken cancellationToken)
    {
        string? inputDirectory = Path.GetDirectoryName(_inputFilePath);

        if (string.IsNullOrWhiteSpace(inputDirectory)
            || !Directory.Exists(inputDirectory))
        {
            throw new DirectoryNotFoundException(
                "Pipeline input directory was not found.");
        }

        string[] filePaths = Directory
            .EnumerateFiles(inputDirectory, "*.json", SearchOption.TopDirectoryOnly)
            .OrderBy(path => path, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        var files = new List<PipelineInputFile>(filePaths.Length);

        foreach (string filePath in filePaths)
        {
            cancellationToken.ThrowIfCancellationRequested();

            string content = await File.ReadAllTextAsync(
                filePath,
                cancellationToken);

            files.Add(new PipelineInputFile(
                Path.GetFileName(filePath),
                content));
        }

        return files;
    }
}
