namespace tb.api.template.API.DTOs.Province;

public interface IProvinceDto
{
    string Code { get; set; }
    string NameTh { get; set; }
    string NameEn { get; set; }
    string PrefixNameTh { get; set; }
    string PrefixFullnameTh { get; set; }
    string? Displayorder { get; set; }
    bool? Active { get; set; }
}
public record ProvinceDto() : IProvinceDto
{
    public string Code { get; set; } = string.Empty;
    public string NameTh { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string PrefixNameTh { get; set; } = string.Empty;
    public string PrefixFullnameTh { get; set; } = string.Empty;
    public string? Displayorder { get; set; }
    public bool? Active { get; set; }
}
public record SearchResultProvinceDto() : ProvinceDto, IProvinceDto
{
    public Guid Id { get; set; }
}
