using tb.api.template.API.DTOs;
using tb.api.template.API.Infrastructure.Execptions;
using tb.api.template.API.Services;

namespace tb.api.template.API.Tests.Program;

/// <summary>Throws NotFoundException for every call — used to test the global exception handler.</summary>
public sealed class ThrowNotFoundApiAuthenticationService : IApiAuthenticationService
{
    public Task<Guid> CreateAsync(object request, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
    public Task<bool> DeleteAsync(Guid key, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
    public Task<bool> DeletesAsync(Guid[] key, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
    public Task<object?> GetByIdAsync(Guid key, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
    public Task<SearchResult<object>> SearchAsync(object request, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
    public Task<int> UpdateAsync(object request, Guid key, CancellationToken cancellationToken = default) => throw new NotFoundException("Resource not found");
}

/// <summary>Throws a generic exception for every call — used to test the global exception handler.</summary>
public sealed class ThrowGenericApiAuthenticationService : IApiAuthenticationService
{
    public Task<Guid> CreateAsync(object request, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
    public Task<bool> DeleteAsync(Guid key, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
    public Task<bool> DeletesAsync(Guid[] key, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
    public Task<object?> GetByIdAsync(Guid key, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
    public Task<SearchResult<object>> SearchAsync(object request, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
    public Task<int> UpdateAsync(object request, Guid key, CancellationToken cancellationToken = default) => throw new InvalidOperationException("Unexpected error");
}
