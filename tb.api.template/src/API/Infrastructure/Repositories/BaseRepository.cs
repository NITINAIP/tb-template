using tb.api.template.API.Infrastructure.Data;

namespace tb.api.template.API.Infrastructure.Repositories;

public interface IBaseRepository<TEntity, TKey>
{
    Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TEntity?> GetByIdAsync(TKey id, CancellationToken cancellationToken = default);
    Task<TKey> CreateAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task<int> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(TKey id, CancellationToken cancellationToken = default);
    Task<bool> DeletesAsync(TKey[] id, CancellationToken cancellationToken = default);
    Task<(TEntity[] Result, int Total)> SearchAsync(TEntity Filter, int Page, int Limit, CancellationToken cancellationToken = default);

}
public abstract class BaseRepository<TEntity, TKey>(IDapperContext ctx) : IBaseRepository<TEntity, TKey>
{
    protected abstract string sqlInsert { get; }
    protected abstract string sqlDelete { get; }
    protected abstract string sqlDeletes { get; }
    protected abstract string sqlUpdate { get; }
    protected abstract string sqlFindOne { get; }
    public virtual async Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.QueryAsync<TEntity>(connection, sqlInsert, cancellationToken: cancellationToken);
    }
    public virtual async Task<TEntity?> GetByIdAsync(TKey id, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.QueryFirstOrDefaultAsync<TEntity>(connection, sqlFindOne, new { Id = id }, cancellationToken: cancellationToken);
    }
    public virtual async Task<TKey> CreateAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.ExecuteScalarAsync<TKey>(connection, sqlInsert, entity, cancellationToken: cancellationToken) ?? default!;
    }
    public virtual async Task<int> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.ExecuteAsync(connection, sqlUpdate, entity, cancellationToken: cancellationToken);
    }
    public virtual async Task<bool> DeleteAsync(TKey id, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.ExecuteAsync(connection, sqlDelete, new { Id = id }, cancellationToken: cancellationToken).ContinueWith(t => t.Result > 0, cancellationToken);
    }
    public abstract Task<(TEntity[] Result, int Total)> SearchAsync(TEntity Filter, int Page, int Limit, CancellationToken cancellationToken = default);

    public async Task<bool> DeletesAsync(TKey[] id, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        return await ctx.ExecuteAsync(connection, sqlDeletes, new { Id = id }, cancellationToken: cancellationToken).ContinueWith(t => t.Result > 0, cancellationToken);
    }
}