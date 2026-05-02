
using Microsoft.AspNetCore.Mvc;
using tb.api.template.API.DTOs;
using tb.api.template.API.Services;
using tb.api.template.API.DTOs;

namespace tb.api.template.API.Controllers;

public abstract class CrudControllerBase<TRequest, TKey, TService>(IApiHandler<TService, TKey> apiHandler) : ControllerBase
 where TService : ICrudServiceBase<TKey>
 where TRequest : class
{

    [HttpPost("search")]
    public async Task<IActionResult> SearchAsync(SearchRequest<TRequest> req, CancellationToken cancellationToken = default)
    {
        var result = await apiHandler.Service.SearchAsync(req, cancellationToken);
        return Ok(Result.Success(result, "Search successfully"));
    }

    [HttpGet("find/{Id}")]
    public async Task<IActionResult> FindAsync([FromRoute] TKey Id, CancellationToken cancellationToken = default)
    {
        var result = await apiHandler.Service.GetByIdAsync(Id, cancellationToken);
        return Ok(Result.Success(result, "Find successfully"));
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateAsync(TRequest req, CancellationToken cancellationToken = default)
    {
        var result = await apiHandler.Service.CreateAsync(req, cancellationToken);
        return Ok(Result.AffectedRows(result, "Create successfully"));
    }

    [HttpPut("update/{Id}")]
    public async Task<IActionResult> UpdateAsync(TRequest req, [FromRoute] TKey Id, CancellationToken cancellationToken = default)
    {

        var result = await apiHandler.Service.UpdateAsync(req, Id, cancellationToken);
        return Ok(Result.AffectedRows(result, "Update successfully"));

    }

    [HttpDelete("delete/{Id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] TKey Id, CancellationToken cancellationToken = default)
    {
        var result = await apiHandler.Service.DeleteAsync(Id, cancellationToken);
        return Ok(Result.AffectedRows(result, "Delete successfully"));
    }
}
