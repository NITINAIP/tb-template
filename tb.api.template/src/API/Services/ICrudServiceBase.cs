using tb.api.template.API.DTOs;

namespace tb.api.template.API.Services;

public interface ICrudServiceBase<TKey>
{
    Task<SearchResult<object>> SearchAsync(object request, CancellationToken cancellationToken = default);
    Task<TKey> CreateAsync(object request, CancellationToken cancellationToken = default);
    Task<int> UpdateAsync(object request,TKey key, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(TKey key, CancellationToken cancellationToken = default);
    Task<object?> GetByIdAsync(TKey key, CancellationToken cancellationToken = default);
    Task<bool> DeletesAsync(TKey[] key, CancellationToken cancellationToken = default);
}