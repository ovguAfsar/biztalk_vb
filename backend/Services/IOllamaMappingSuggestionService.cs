using MappingStudio.Api.DTOs;

namespace MappingStudio.Api.Services;

public interface IOllamaMappingSuggestionService
{
    Task<AiMappingSuggestionResponse> SuggestAsync(
        AiMappingSuggestionRequest? request,
        CancellationToken cancellationToken);
}
