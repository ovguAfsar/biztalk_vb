using System.Text.Json;
using MappingStudio.Api.DTOs;
using MappingStudio.Api.Pipelines.FileMapping;
using MappingStudio.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MappingStudio.Api.Controllers;

[ApiController]
[Route("api/mappings/{mappingId}/pipeline")]
public sealed class FileMappingPipelineController : ControllerBase
{
    private readonly IFileMappingPipeline _pipeline;

    public FileMappingPipelineController(IFileMappingPipeline pipeline)
    {
        _pipeline = pipeline;
    }

    [HttpPost("run")]
    [ProducesResponseType(typeof(TestMappingResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(TestMappingResponse), StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TestMappingResponse>> Run(
        string mappingId,
        CancellationToken cancellationToken)
    {
        try
        {
            TestMappingResponse response =
                await _pipeline.RunAsync(mappingId, cancellationToken);

            if (response.Errors.Count > 0)
            {
                return UnprocessableEntity(response);
            }

            return Ok(response);
        }
        catch (InputValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(
                new Dictionary<string, string[]>
                {
                    ["input"] = exception.Errors.ToArray()
                })
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Pipeline girdisi gecersiz."
            });
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Pipeline bilgileri gecersiz."
            });
        }
        catch (MappingNotFoundException)
        {
            return NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Mapping bulunamadi."
            });
        }
        catch (FileNotFoundException)
        {
            return NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Giris dosyasi bulunamadi."
            });
        }
        catch (JsonException)
        {
            return BadRequest(new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Giris dosyasi gecerli JSON degil."
            });
        }
    }

    [HttpPost("run-all")]
    [ProducesResponseType(typeof(FilePipelineBatchResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FilePipelineBatchResponse>> RunAll(
        string mappingId,
        CancellationToken cancellationToken)
    {
        try
        {
            FilePipelineBatchResponse response =
                await _pipeline.RunAllAsync(mappingId, cancellationToken);

            return Ok(response);
        }
        catch (MappingNotFoundException)
        {
            return NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Mapping bulunamadi."
            });
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Giris klasoru bulunamadi."
            });
        }
    }
}
