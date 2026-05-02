using System.Data;
using tb.api.template.API.Infrastructure.Data;

namespace tb.api.template.API.Tests.Program;

/// <summary>
/// Stub IDapperContext that avoids real DB connections during integration tests.
/// </summary>
public sealed class MockDapperContext : IDapperContext
{
    public IDbConnection CreateConnection() => new Moq.Mock<IDbConnection>().Object;

    public Task<IEnumerable<T>> QueryAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
        => Task.FromResult(Enumerable.Empty<T>());

    public Task<T?> QueryFirstOrDefaultAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
        => Task.FromResult(default(T));

    public Task<T?> ExecuteScalarAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
        => Task.FromResult(default(T));

    public Task<int> ExecuteAsync(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
        => Task.FromResult(0);
}
