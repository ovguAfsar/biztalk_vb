using MappingStudio.Api.DTOs;
using MappingStudio.Api.Options;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MappingStudio.Api.Services;

public sealed class OllamaMappingSuggestionService : IOllamaMappingSuggestionService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private static readonly Regex TokenPattern = new("[a-z0-9]+", RegexOptions.Compiled);
    private static readonly IReadOnlyDictionary<string, string> SemanticAliases = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        ["account"] = "hesap",
        ["acct"] = "hesap",
        ["ay"] = "ay",
        ["aykodu"] = "ay",
        ["bank"] = "banka",
        ["banka"] = "banka",
        ["branch"] = "sube",
        ["company"] = "kurum",
        ["customer"] = "musteri",
        ["hesap"] = "hesap",
        ["hesapno"] = "hesap",
        ["iban"] = "iban",
        ["identity"] = "tc",
        ["kimlik"] = "tc",
        ["kod"] = "kod",
        ["kodu"] = "kod",
        ["kurum"] = "kurum",
        ["maas"] = "maas",
        ["miktar"] = "tutar",
        ["musteri"] = "musteri",
        ["no"] = "no",
        ["numara"] = "no",
        ["numarasi"] = "no",
        ["number"] = "no",
        ["odeme"] = "odeme",
        ["payment"] = "odeme",
        ["sube"] = "sube",
        ["tc"] = "tc",
        ["tckn"] = "tc",
        ["tutar"] = "tutar",
        ["type"] = "tur",
        ["tur"] = "tur",
        ["turu"] = "tur"
    };
    private readonly HttpClient _httpClient;
    private readonly OllamaOptions _options;

    public OllamaMappingSuggestionService(HttpClient httpClient, IOptions<OllamaOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<AiMappingSuggestionResponse> SuggestAsync(
        AiMappingSuggestionRequest? request,
        CancellationToken cancellationToken)
    {
        var validationErrors = Validate(request);
        if (validationErrors.Count > 0)
        {
            return new AiMappingSuggestionResponse
            {
                IsAvailable = true,
                Message = string.Join(" ", validationErrors),
                Suggestions = Array.Empty<AiMappingSuggestionDto>()
            };
        }

        try
        {
            using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            timeoutCts.CancelAfter(TimeSpan.FromSeconds(20));

            var ollamaRequest = new OllamaGenerateRequest
            {
                Model = _options.Model,
                Prompt = BuildPrompt(request!),
                Stream = false,
                Format = "json",
                Options = new Dictionary<string, object>
                {
                    ["temperature"] = 0,
                    ["num_predict"] = 256
                }
            };

            var response = await _httpClient.PostAsJsonAsync("/api/generate", ollamaRequest, JsonOptions, timeoutCts.Token);
            if (!response.IsSuccessStatusCode)
            {
                return UnavailableResponse();
            }

            var ollamaResponse = await response.Content.ReadFromJsonAsync<OllamaGenerateResponse>(JsonOptions, timeoutCts.Token);
            var suggestions = MergeWithSemanticFallback(ParseSuggestions(ollamaResponse?.Response, request!), request!);

            return new AiMappingSuggestionResponse
            {
                IsAvailable = true,
                Message = suggestions.Count == 0 ? "AI uygun eslesme onermedi." : null,
                Suggestions = suggestions
            };
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            return UnavailableResponse();
        }
        catch (HttpRequestException)
        {
            return UnavailableResponse();
        }
        catch (JsonException)
        {
            return new AiMappingSuggestionResponse
            {
                IsAvailable = true,
                Message = "AI cevabi okunamadi; yerel eslestirme onerileri kullanildi.",
                Suggestions = BuildSemanticFallbackSuggestions(request!)
            };
        }
        catch (Exception) when (!cancellationToken.IsCancellationRequested)
        {
            return UnavailableResponse();
        }
    }

    private static IReadOnlyList<string> Validate(AiMappingSuggestionRequest? request)
    {
        var errors = new List<string>();
        if (request?.SourceFields is null || request.SourceFields.Count == 0)
        {
            errors.Add("Kaynak alan listesi bos.");
        }

        if (request?.TargetFields is null || request.TargetFields.Count == 0)
        {
            errors.Add("Hedef alan listesi bos.");
        }

        return errors;
    }

    private static string BuildPrompt(AiMappingSuggestionRequest request)
    {
        var builder = new StringBuilder();
        builder.AppendLine("You are a data mapping expert for Turkish banking payment/payroll files.");
        builder.AppendLine("Match each source field to the most appropriate target field by MEANING, not just exact text.");
        builder.AppendLine("Source names may be abbreviations, shortened, misspelled, or in Turkish. Understand the intent.");
        builder.AppendLine("Examples of correct matches:");
        builder.AppendLine("- \"hsp\" -> \"hesapNo\" (hsp is short for hesap/account)");
        builder.AppendLine("- \"Alici_Iban\" -> \"iban\"");
        builder.AppendLine("- \"musteri_ad\" -> \"adSoyad\"");
        builder.AppendLine("- \"ttr\" -> \"tutar\" (ttr is short for tutar/amount)");
        builder.AppendLine("- \"tc_kimlik\" -> \"tc\"");
        builder.AppendLine("- \"sube\" -> \"subeKodu\"");
        builder.AppendLine("- \"krm\" -> \"kurumKodu\"");
        builder.AppendLine("- \"hsp\" -> \"hesapNo\"");
        builder.AppendLine("- \"ttr\" -> \"tutar\"");
        builder.AppendLine("- \"sube\" -> \"subeKodu\"");
        builder.AppendLine("- \"dvz\" -> \"dovizCinsi\"");
        builder.AppendLine("- \"ack\" -> \"aciklama\"");
        builder.AppendLine("Use only exact names from the lists below. Do not invent fields. One target can be used once.");
        builder.AppendLine("If you are not confident about a match, do NOT include it (leave it out).");
        builder.AppendLine("Return only JSON, no explanation: {\"mappings\":[{\"sourceField\":\"sourceName\",\"targetField\":\"targetName\",\"confidence\":0.0}]}");
        builder.AppendLine();
        builder.AppendLine("Source fields:");
        foreach (var field in request.SourceFields!)
        {
            builder.AppendLine($"- name: {field.Name}; label: {field.DisplayName}; type: {field.Type}");
        }

        builder.AppendLine();
        builder.AppendLine("Target fields:");
        foreach (var field in request.TargetFields!)
        {
            builder.AppendLine($"- name: {field.Name}; label: {field.DisplayName}; type: {field.Type}");
        }

        return builder.ToString();
    }

    private static IReadOnlyList<AiMappingSuggestionDto> ParseSuggestions(
        string? responseText,
        AiMappingSuggestionRequest request)
    {
        if (string.IsNullOrWhiteSpace(responseText))
        {
            return Array.Empty<AiMappingSuggestionDto>();
        }

        var parsedMappings = TryParseMappings(responseText);
        if (parsedMappings.Count == 0)
        {
            return Array.Empty<AiMappingSuggestionDto>();
        }

        var sourceNames = request.SourceFields!
            .Where(field => !string.IsNullOrWhiteSpace(field.Name))
            .GroupBy(field => field.Name!, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.First().Name!, StringComparer.OrdinalIgnoreCase);
        var targetNames = request.TargetFields!
            .Where(field => !string.IsNullOrWhiteSpace(field.Name))
            .GroupBy(field => field.Name!, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.First().Name!, StringComparer.OrdinalIgnoreCase);
        var usedTargets = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var suggestions = new List<AiMappingSuggestionDto>();

        foreach (var mapping in parsedMappings)
        {
            if (string.IsNullOrWhiteSpace(mapping.SourceField)
                || string.IsNullOrWhiteSpace(mapping.TargetField)
                || !sourceNames.TryGetValue(mapping.SourceField, out var sourceName)
                || !targetNames.TryGetValue(mapping.TargetField, out var targetName)
                || !usedTargets.Add(targetName))
            {
                continue;
            }

            suggestions.Add(new AiMappingSuggestionDto
            {
                SourceField = sourceName,
                TargetField = targetName,
                Confidence = mapping.Confidence,
                Reason = mapping.Reason
            });
        }

        return suggestions;
    }

    private static IReadOnlyList<AiMappingSuggestionDto> MergeWithSemanticFallback(
        IReadOnlyList<AiMappingSuggestionDto> aiSuggestions,
        AiMappingSuggestionRequest request)
    {
        var suggestionsByTarget = aiSuggestions
            .GroupBy(suggestion => suggestion.TargetField, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                group => group.Key,
                group => group.OrderByDescending(suggestion => suggestion.Confidence ?? 0.65).First(),
                StringComparer.OrdinalIgnoreCase);

        foreach (var fallback in BuildSemanticFallbackSuggestions(request))
        {
            if (!suggestionsByTarget.TryGetValue(fallback.TargetField, out var existing)
                || (fallback.Confidence ?? 0) >= (existing.Confidence ?? 0.65)
                || (fallback.Confidence ?? 0) >= 0.9)
            {
                suggestionsByTarget[fallback.TargetField] = fallback;
            }
        }

        var usedSources = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        return request.TargetFields!
            .Select(field => field.Name)
            .Where(targetName => !string.IsNullOrWhiteSpace(targetName))
            .Select(targetName => suggestionsByTarget.TryGetValue(targetName!, out var suggestion) ? suggestion : null)
            .Where(suggestion => suggestion is not null)
            .Cast<AiMappingSuggestionDto>()
            .Where(suggestion => usedSources.Add(suggestion.SourceField))
            .ToList();
    }

    private static IReadOnlyList<AiMappingSuggestionDto> BuildSemanticFallbackSuggestions(AiMappingSuggestionRequest request)
    {
        var sourceProfiles = request.SourceFields!
            .Where(field => !string.IsNullOrWhiteSpace(field.Name))
            .Select(CreateFieldProfile)
            .ToList();
        var usedSources = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var suggestions = new List<AiMappingSuggestionDto>();

        foreach (var target in request.TargetFields!.Where(field => !string.IsNullOrWhiteSpace(field.Name)))
        {
            var targetProfile = CreateFieldProfile(target);
            var best = sourceProfiles
                .Where(source => !usedSources.Contains(source.Name))
                .Select(source => new
                {
                    Source = source,
                    Score = ScoreSemanticMatch(source, targetProfile)
                })
                .Where(candidate => candidate.Score >= 0.46)
                .OrderByDescending(candidate => candidate.Score)
                .FirstOrDefault();

            if (best is null)
            {
                continue;
            }

            usedSources.Add(best.Source.Name);
            suggestions.Add(new AiMappingSuggestionDto
            {
                SourceField = best.Source.Name,
                TargetField = targetProfile.Name,
                Confidence = Math.Round(Math.Min(0.98, best.Score), 2),
                Reason = "Yerel anlamsal skor"
            });
        }

        return suggestions;
    }

    private static FieldProfile CreateFieldProfile(AiMappingFieldDto field)
    {
        var text = $"{field.Name} {field.DisplayName}".Trim();
        var tokens = Tokenize(text);
        return new FieldProfile(
            field.Name!,
            new HashSet<string>(tokens, StringComparer.OrdinalIgnoreCase),
            string.Concat(tokens),
            field.Type?.Trim().ToLowerInvariant());
    }

    private static IReadOnlyList<string> Tokenize(string text)
    {
        var normalized = NormalizeText(text);
        var splitCamelCase = Regex.Replace(normalized, "([a-z])([0-9])|([0-9])([a-z])", "$1$3 $2$4");
        return TokenPattern.Matches(splitCamelCase)
            .Select(match => match.Value)
            .SelectMany(ExpandToken)
            .Where(token => token.Length > 0)
            .Select(token => SemanticAliases.TryGetValue(token, out var alias) ? alias : token)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static IEnumerable<string> ExpandToken(string token)
    {
        yield return token;

        var compactAliases = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
        {
            ["hesapno"] = new[] { "hesap", "no" },
            ["hesapnumarasi"] = new[] { "hesap", "no" },
            ["musterihesapno"] = new[] { "musteri", "hesap", "no" },
            ["musterihesapnumarasi"] = new[] { "musteri", "hesap", "no" },
            ["odemekodu"] = new[] { "odeme", "kod" },
            ["maasturu"] = new[] { "maas", "tur" },
            ["maastutari"] = new[] { "maas", "tutar" },
            ["subekodu"] = new[] { "sube", "kod" },
            ["kurumkodu"] = new[] { "kurum", "kod" },
            ["tcno"] = new[] { "tc", "no" },
            ["tckimlikno"] = new[] { "tc", "no" }
        };

        if (compactAliases.TryGetValue(token, out var aliases))
        {
            foreach (var alias in aliases)
            {
                yield return alias;
            }
        }
    }

    private static double ScoreSemanticMatch(FieldProfile source, FieldProfile target)
    {
        if (source.CompactText.Equals(target.CompactText, StringComparison.OrdinalIgnoreCase))
        {
            return 0.98;
        }

        if (source.CompactText.Contains(target.CompactText, StringComparison.OrdinalIgnoreCase)
            || target.CompactText.Contains(source.CompactText, StringComparison.OrdinalIgnoreCase))
        {
            return 0.86;
        }

        var intersection = source.Tokens.Intersect(target.Tokens, StringComparer.OrdinalIgnoreCase).Count();
        var union = source.Tokens.Union(target.Tokens, StringComparer.OrdinalIgnoreCase).Count();
        var score = union == 0 ? 0 : (double)intersection / union;

        if (!string.IsNullOrWhiteSpace(source.Type)
            && !string.IsNullOrWhiteSpace(target.Type)
            && source.Type.Equals(target.Type, StringComparison.OrdinalIgnoreCase))
        {
            score += 0.08;
        }

        if (source.Tokens.Contains("tc") && target.Tokens.Contains("tc"))
        {
            score += 0.25;
        }

        if (source.Tokens.Contains("iban") && target.Tokens.Contains("iban"))
        {
            score += 0.25;
        }

        if (source.Tokens.Contains("hesap") && target.Tokens.Contains("hesap"))
        {
            score += 0.18;
        }

        return Math.Min(score, 0.98);
    }

    private static string NormalizeText(string text)
    {
        return text
            .Replace('Ç', 'c')
            .Replace('ç', 'c')
            .Replace('Ğ', 'g')
            .Replace('ğ', 'g')
            .Replace('İ', 'i')
            .Replace('I', 'i')
            .Replace('ı', 'i')
            .Replace('Ö', 'o')
            .Replace('ö', 'o')
            .Replace('Ş', 's')
            .Replace('ş', 's')
            .Replace('Ü', 'u')
            .Replace('ü', 'u')
            .ToLowerInvariant();
    }

    private static IReadOnlyList<OllamaMappingJsonItem> TryParseMappings(string text)
    {
        foreach (var json in ExtractJsonCandidates(text))
        {
            try
            {
                var objectResponse = JsonSerializer.Deserialize<OllamaMappingJsonResponse>(json, JsonOptions);
                if (objectResponse?.Mappings is { Count: > 0 })
                {
                    return objectResponse.Mappings;
                }

                var arrayResponse = JsonSerializer.Deserialize<IReadOnlyList<OllamaMappingJsonItem>>(json, JsonOptions);
                if (arrayResponse is { Count: > 0 })
                {
                    return arrayResponse;
                }
            }
            catch (JsonException)
            {
                continue;
            }
        }

        return Array.Empty<OllamaMappingJsonItem>();
    }

    private static IEnumerable<string> ExtractJsonCandidates(string text)
    {
        var startIndex = text.IndexOf('{');
        var endIndex = text.LastIndexOf('}');
        if (startIndex >= 0 && endIndex >= startIndex)
        {
            yield return text[startIndex..(endIndex + 1)];
        }

        startIndex = text.IndexOf('[');
        endIndex = text.LastIndexOf(']');
        if (startIndex >= 0 && endIndex >= startIndex)
        {
            yield return text[startIndex..(endIndex + 1)];
        }

        yield return text;
    }

    private static AiMappingSuggestionResponse UnavailableResponse()
    {
        return new AiMappingSuggestionResponse
        {
            IsAvailable = false,
            Message = "AI su an kullanilamiyor.",
            Suggestions = Array.Empty<AiMappingSuggestionDto>()
        };
    }

    private sealed class OllamaGenerateRequest
    {
        public required string Model { get; init; }

        public required string Prompt { get; init; }

        public bool Stream { get; init; }

        public string? Format { get; init; }

        public IReadOnlyDictionary<string, object>? Options { get; init; }
    }

    private sealed class OllamaGenerateResponse
    {
        public string? Response { get; init; }
    }

    private sealed class OllamaMappingJsonResponse
    {
        public IReadOnlyList<OllamaMappingJsonItem>? Mappings { get; init; }
    }

    private sealed class OllamaMappingJsonItem
    {
        public string? SourceField { get; init; }

        public string? TargetField { get; init; }

        public double? Confidence { get; init; }

        public string? Reason { get; init; }
    }

    private sealed record FieldProfile(
        string Name,
        IReadOnlySet<string> Tokens,
        string CompactText,
        string? Type);
}
