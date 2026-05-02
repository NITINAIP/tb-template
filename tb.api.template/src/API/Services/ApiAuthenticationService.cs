using tb.api.template.API.Domain.Entities;
using tb.api.template.API.DTOs;
using tb.api.template.API.DTOs.ApiAuthentication;
using tb.api.template.API.Infrastructure.Repositories;

namespace tb.api.template.API.Services;

public interface IApiAuthenticationService : ICrudServiceBase<Guid>
{

}
public class ApiAuthenticationService(ITniDataServiceContext ctx) : IApiAuthenticationService
{
    public async Task<Guid> CreateAsync(object request, CancellationToken cancellationToken = default)
    {
        if (request is ApiAuthenticationDto req)
        {
            return await ctx.TbApiAuthenticationRepo.CreateAsync(req.ToEntity("System"), cancellationToken);
        }
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(Guid key, CancellationToken cancellationToken = default)
    {
        return await ctx.TbApiAuthenticationRepo.DeleteAsync(key, cancellationToken);
    }

    public async Task<bool> DeletesAsync(Guid[] key, CancellationToken cancellationToken = default)
    {
        return await ctx.TbApiAuthenticationRepo.DeletesAsync(key, cancellationToken);
    }

    public async Task<object?> GetByIdAsync(Guid key, CancellationToken cancellationToken = default)
    {
        var result = await ctx.TbApiAuthenticationRepo.GetByIdAsync(key, cancellationToken);
        return result?.ToDto();
    }

    public async Task<SearchResult<object>> SearchAsync(object request, CancellationToken cancellationToken = default)
    {
        if (request is SearchRequest<ApiAuthenticationDto> req)
        {
            req.Filter ??= new ApiAuthenticationDto();
            var (result, total) = await ctx.TbApiAuthenticationRepo.SearchAsync(req.Filter.ToEntity(), req.Page, req.Limit, cancellationToken);
            return new SearchResult<object>
            {
                Items = result.Select(x => x.ToDto()).ToArray(),
                TotalItems = total,
                Limit = req.Limit,
                Page = req.Page
            };
        }
        throw new NotImplementedException();
    }

    public async Task<int> UpdateAsync(object request, Guid key, CancellationToken cancellationToken = default)
    {
        if (request is ApiAuthenticationDto req)
        {
            return await ctx.TbApiAuthenticationRepo.UpdateAsync(req.ToEntity("System", key), cancellationToken);
        }
        throw new NotImplementedException();
    }
}