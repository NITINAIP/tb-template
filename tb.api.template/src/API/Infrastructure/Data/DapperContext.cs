using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using tb.api.template.API.Services;

namespace tb.api.template.API.Infrastructure.Data;

public interface IDapperWrapper
{
    Task<int> ExecuteAsync(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> QueryAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default);
    Task<T?> QueryFirstOrDefaultAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default);
    Task<T?> ExecuteScalarAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default);

}
public interface IDapperContext : IDapperWrapper
{
    IDbConnection CreateConnection();
}

public class DapperContext : IDapperContext
{
    private readonly IConfigurationsService _service;
    public DapperContext(IConfigurationsService service)
    {
        DefaultTypeMap.MatchNamesWithUnderscores = true;
        this._service = service;
    }
    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_service.ConnectionStrings.DefaultConnection);
    }

    public async Task<int> ExecuteAsync(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
    {
        return await connection.ExecuteAsync(new CommandDefinition(sql, param, transaction, commandTimeout, commandType, cancellationToken: cancellationToken));
    }

    public async Task<T?> ExecuteScalarAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
    {
        return await connection.ExecuteScalarAsync<T>(new CommandDefinition(sql, param, transaction, commandTimeout, commandType, cancellationToken: cancellationToken));
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
    {
        return await connection.QueryAsync<T>(new CommandDefinition(sql, param, transaction, commandTimeout, commandType, cancellationToken: cancellationToken));
    }

    public async Task<T?> QueryFirstOrDefaultAsync<T>(IDbConnection connection, string sql, object? param = null, IDbTransaction? transaction = null, int? commandTimeout = null, CommandType? commandType = null, CancellationToken cancellationToken = default)
    {
        return await connection.QueryFirstOrDefaultAsync<T>(new CommandDefinition(sql, param, transaction, commandTimeout, commandType, cancellationToken: cancellationToken));
    }
}