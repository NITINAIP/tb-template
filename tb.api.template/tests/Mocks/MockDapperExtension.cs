using System.Data;
using System.Data.Common;
using Dapper;
using Moq;
using Moq.Dapper;
using tb.api.template.API.Infrastructure.Data;

namespace tb.api.template.API.Tests.Mocks;


public static class MockDapperExtension
{
    public static void MockDapperDefault<R>(this Mock<IDapperContext> mock) where R : class
    {
        var connectionMock = new Mock<IDbConnection>();
        mock.Setup(c => c.CreateConnection()).Returns(connectionMock.Object);
        mock.Setup(c => c.ExecuteScalarAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync((R?)null);
        mock.Setup(c => c.QueryFirstOrDefaultAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync((R?)null);
        mock.Setup(c => c.QueryAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(new List<R>());
        mock.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(1);

    }

    public static void MockDapperQueryAsync<R>(this Mock<IDapperContext> mock, List<R> res) where R : class
    {
        mock.Setup(c => c.QueryAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);
    }
    public static void MockDapperSearchQueryAsync<R>(this Mock<IDapperContext> mock, List<R> res) where R : class
    {

        mock.Setup(c => c.QueryAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);
        mock.Setup(c => c.ExecuteScalarAsync<int>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res.Count);

    }

    public static void MockDapperQueryFirstOrDefaultAsync<R>(this Mock<IDapperContext> mock, R? res) where R : class
    {
        mock.Setup(c => c.QueryFirstOrDefaultAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);
    }

    public static void MockDapperExecuteAsync(this Mock<IDapperContext> mock, int res)
    {
        mock.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);

    }

    public static void MockExecuteScalarAsync<R>(this Mock<IDapperContext> mock, R? res) where R : class
    {
        mock.Setup(c => c.ExecuteScalarAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);
    }
    public static void MockExecuteScalarAsyncStruct<R>(this Mock<IDapperContext> mock, R res) where R : struct
    {
        mock.Setup(c => c.ExecuteScalarAsync<R>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(res);
    }
}
