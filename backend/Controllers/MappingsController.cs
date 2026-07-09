using MappingStudio.Api.DTOs;
using MappingStudio.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MappingStudio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class MappingsController : ControllerBase
{
    private readonly IMappingService _mappingService;
    private readonly IOllamaMappingSuggestionService _ollamaMappingSuggestionService;

    public MappingsController(
        IMappingService mappingService,
        IOllamaMappingSuggestionService ollamaMappingSuggestionService)
    {
        _mappingService = mappingService;
        _ollamaMappingSuggestionService = ollamaMappingSuggestionService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<MappingResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<MappingResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var response = await _mappingService.GetAllAsync(cancellationToken);
        return Ok(response);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(MappingResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MappingResponse>> GetById(string id, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.GetByIdAsync(id, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping bilgileri gecersiz."
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

    [HttpPost]
    [ProducesResponseType(typeof(MappingResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MappingResponse>> Create(
        [FromBody] CreateMappingRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.CreateAsync(request, cancellationToken);
            return Created($"/api/mappings/{response.Id}", response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping bilgileri gecersiz."
            });
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(MappingResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MappingResponse>> Update(
        string id,
        [FromBody] UpdateMappingRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.UpdateAsync(id, request, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping bilgileri gecersiz."
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

    [HttpPut("{id}/source")]
    [ProducesResponseType(typeof(SourceSchemaResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SourceSchemaResponse>> SaveSourceSchema(
        string id,
        [FromBody] SaveSourceSchemaRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.SaveSourceSchemaAsync(id, request, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Kaynak veri bilgileri gecersiz."
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

    [HttpPut("{id}/target")]
    [ProducesResponseType(typeof(TargetSchemaResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TargetSchemaResponse>> SaveTargetSchema(
        string id,
        [FromBody] SaveTargetSchemaRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.SaveTargetSchemaAsync(id, request, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Hedef veri bilgileri gecersiz."
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

    [HttpPut("{id}/mappings")]
    [ProducesResponseType(typeof(SaveMappingsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SaveMappingsResponse>> SaveMappings(
        string id,
        [FromBody] SaveMappingsRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.SaveMappingsAsync(id, request, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping eslestirme bilgileri gecersiz."
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

    [HttpPost("{id}/test")]
    [ProducesResponseType(typeof(TestMappingResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TestMappingResponse>> TestMapping(
        string id,
        [FromBody] TestMappingRequest? request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mappingService.TestMappingAsync(id, request, cancellationToken);
            return Ok(response);
        }
        catch (MappingValidationException exception)
        {
            return BadRequest(new ValidationProblemDetails(exception.Errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Mapping test bilgileri gecersiz."
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

    [HttpPost("ai-suggest")]
    [ProducesResponseType(typeof(AiMappingSuggestionResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<AiMappingSuggestionResponse>> SuggestMappingsWithAi(
        [FromBody] AiMappingSuggestionRequest? request,
        CancellationToken cancellationToken)
    {
        var response = await _ollamaMappingSuggestionService.SuggestAsync(request, cancellationToken);
        return Ok(response);
    }
}
