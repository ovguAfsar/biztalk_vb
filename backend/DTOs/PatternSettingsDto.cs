namespace MappingStudio.Api.DTOs;

public sealed class PatternSettingsDto
{
    public MtvHeaderSettingsDto? MtvHeader { get; init; }
}

public sealed class MtvHeaderSettingsDto
{
    public string? SubeKodu { get; init; }

    public string? KurumKodu { get; init; }

    public string? DosyaTarihi { get; init; }

    public string? KurumHesapNo { get; init; }
}
