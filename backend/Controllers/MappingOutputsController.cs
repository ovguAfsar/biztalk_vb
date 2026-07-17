using MappingStudio.Api.DTOs;
using MappingStudio.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MappingStudio.Api.Controllers;

[ApiController]
[Route("api/mappings/{mappingId}/outputs")]
public sealed class MappingOutputsController : ControllerBase
{
    private readonly IMappingOutputService _outputService;

    public MappingOutputsController(IMappingOutputService outputService) => _outputService = outputService;

    [HttpPost]
    [ProducesResponseType(typeof(MappingOutputResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(MappingOutputResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<MappingOutputResponse>> Save(
        string mappingId,
        [FromBody] SaveMappingOutputRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _outputService.SaveAsync(mappingId, request, cancellationToken);
            return response.AlreadyExists
                ? Ok(response)
                : Created($"/api/mappings/{mappingId}/outputs/{response.Id}", response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping cikti bilgileri gecersiz."
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
    }
}
