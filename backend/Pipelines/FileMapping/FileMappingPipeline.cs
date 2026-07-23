using MappingStudio.Api.DTOs;
using MappingStudio.Api.Services;
using System.Text.Json;

namespace MappingStudio.Api.Pipelines.FileMapping;

public sealed class FileMappingPipeline : IFileMappingPipeline
{
    private readonly IGetterAdapter _getter;
    private readonly IRawDataConverter _converter;
    private readonly IInputValidator _validator;
    private readonly IMappingService _mappingService;
    private readonly ISenderAdapter _sender;

    public FileMappingPipeline(
        IGetterAdapter getter,
        IRawDataConverter converter,
        IInputValidator validator,
        IMappingService mappingService,
        ISenderAdapter sender)
    {
        _getter = getter;
        _converter = converter;
        _validator = validator;
        _mappingService = mappingService;
        _sender = sender;
    }

    public async Task<TestMappingResponse> RunAsync(
        string mappingId,
        CancellationToken cancellationToken)
    {
        string rawData = await _getter.GetDataAsync(cancellationToken);
        var json = _converter.Convert(rawData);

        _validator.Validate(json);

        var request = new TestMappingRequest
        {
            Input = json
        };

        TestMappingResponse response =
            await _mappingService.TestMappingAsync(
                mappingId,
                request,
                cancellationToken);

        if (response.Errors.Count > 0)
        {
            return response;
        }

        await _sender.SendAsync(
            response.Output,
            cancellationToken);

        return response;
    }

    public async Task<FilePipelineBatchResponse> RunAllAsync(
        string mappingId,
        CancellationToken cancellationToken)
    {
        IReadOnlyList<PipelineInputFile> inputFiles =
            await _getter.GetFilesAsync(cancellationToken);

        var results = new List<FilePipelineItemResult>(inputFiles.Count);

        foreach (PipelineInputFile inputFile in inputFiles)
        {
            cancellationToken.ThrowIfCancellationRequested();

            try
            {
                JsonElement json = _converter.Convert(inputFile.Content);
                _validator.Validate(json);

                var request = new TestMappingRequest
                {
                    Input = json
                };

                TestMappingResponse response =
                    await _mappingService.TestMappingAsync(
                        mappingId,
                        request,
                        cancellationToken);

                if (response.Errors.Count > 0)
                {
                    results.Add(new FilePipelineItemResult
                    {
                        FileName = inputFile.FileName,
                        Success = false,
                        Response = response,
                        Errors = response.Errors
                    });

                    continue;
                }

                await _sender.SendAsync(
                    inputFile.FileName,
                    response.Output,
                    cancellationToken);

                results.Add(new FilePipelineItemResult
                {
                    FileName = inputFile.FileName,
                    Success = true,
                    Response = response,
                    Errors = Array.Empty<string>()
                });
            }
            catch (InputValidationException exception)
            {
                results.Add(Failed(inputFile.FileName, exception.Errors));
            }
            catch (JsonException exception)
            {
                results.Add(Failed(
                    inputFile.FileName,
                    new[] { $"Invalid JSON: {exception.Message}" }));
            }
            catch (ArgumentException exception)
            {
                results.Add(Failed(inputFile.FileName, new[] { exception.Message }));
            }
        }

        int succeeded = results.Count(result => result.Success);

        return new FilePipelineBatchResponse
        {
            Total = results.Count,
            Succeeded = succeeded,
            Failed = results.Count - succeeded,
            Files = results
        };
    }

    private static FilePipelineItemResult Failed(
        string fileName,
        IReadOnlyList<string> errors)
    {
        return new FilePipelineItemResult
        {
            FileName = fileName,
            Success = false,
            Errors = errors
        };
    }
}
