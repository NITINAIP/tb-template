using tb.api.template.API.DTOs.ApiAuthentication;

namespace tb.api.template.API.Domain.Entities;

public class TbApiAuthentication : BaseEntity
{
    public string AccountUser { get; set; } = string.Empty;
    public string AccountName { get; set; } = string.Empty;
    public string AppId { get; set; } = string.Empty;
    public string AppKey { get; set; } = string.Empty;
    public bool Active { get; set; }
}

public static class TbApiAuthenticationExtensions
{
    public static SearchResultApiAuthenticationDto ToDto(this TbApiAuthentication entity)
    {
        return new SearchResultApiAuthenticationDto
        {
            Id = entity.Id,
            AccountUser = entity.AccountUser,
            AccountName = entity.AccountName,
            AppId = entity.AppId,
            AppKey = entity.AppKey,
            Active = entity.Active
        };
    }
    public static TbApiAuthentication ToEntity(this ApiAuthenticationDto dto, string CreatedBy)
    {
        return new TbApiAuthentication
        {
            AccountUser = dto.AccountUser,
            AccountName = dto.AccountName,
            AppId = dto.AppId,
            AppKey = dto.AppKey,
            Active = dto.Active,
            CreatedBy = CreatedBy
        };
    }
    public static TbApiAuthentication ToEntity(this ApiAuthenticationDto dto, string UpdatedBy, Guid Id)
    {
        return new TbApiAuthentication
        {
            AccountUser = dto.AccountUser,
            AccountName = dto.AccountName,
            AppId = dto.AppId,
            AppKey = dto.AppKey,
            Active = dto.Active,
            UpdatedBy = UpdatedBy,
            Id = Id
        };
    }
    public static TbApiAuthentication ToEntity(this ApiAuthenticationDto dto)
    {
        return new TbApiAuthentication
        {
            AccountUser = dto.AccountUser,
            AccountName = dto.AccountName,
            AppId = dto.AppId,
            AppKey = dto.AppKey,
            Active = dto.Active,
        };
    }
}