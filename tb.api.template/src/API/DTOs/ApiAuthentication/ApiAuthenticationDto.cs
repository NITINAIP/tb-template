namespace tb.api.template.API.DTOs.ApiAuthentication;
public interface IApiAuthenticationDto
{
    string AccountUser { get; }
    string AccountName { get; }
    string AppId { get; }
    string AppKey { get; }
    bool Active { get; }
}
public record ApiAuthenticationDto() : IApiAuthenticationDto
{
    public string AccountUser { get; set; } = string.Empty;
    public string AccountName { get; set; } = string.Empty;
    public string AppId { get; set; } = string.Empty;
    public string AppKey { get; set; } = string.Empty;
    public bool Active { get; set; }
}
public record SearchResultApiAuthenticationDto() : ApiAuthenticationDto, IApiAuthenticationDto
{
    public Guid Id { get; set; }
}