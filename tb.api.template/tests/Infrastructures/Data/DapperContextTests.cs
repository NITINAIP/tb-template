using System.Data;
using Moq;
using tb.api.template.API.Infrastructure.Data;

namespace tb.api.template.API.Tests.Infrastructures.Data;

public class DapperContextTests
{
    private readonly Mock<IDapperContext> _mockCtx = new();

    public DapperContextTests()
    {
        // Default stubs
        _mockCtx.Setup(c => c.CreateConnection()).Returns(new Mock<IDbConnection>().Object);
        _mockCtx.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(0);
        _mockCtx.Setup(c => c.QueryAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(new List<object>());
        _mockCtx.Setup(c => c.QueryFirstOrDefaultAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync((object?)null);
        _mockCtx.Setup(c => c.ExecuteScalarAsync<int>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(0);
    }

    // --- CreateConnection ---

    [Fact]
    public void CreateConnection_ShouldReturnConnection()
    {
        var connection = _mockCtx.Object.CreateConnection();
        Assert.NotNull(connection);
    }

    // --- ExecuteAsync ---

    [Fact]
    public async Task ExecuteAsync_ShouldReturnAffectedRows()
    {
        _mockCtx.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(1);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteAsync(conn, "DELETE FROM t WHERE id = @Id", new { Id = 1 });

        Assert.Equal(1, result);
    }

    [Fact]
    public async Task ExecuteAsync_WithNoRowsAffected_ShouldReturnZero()
    {
        _mockCtx.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(0);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteAsync(conn, "DELETE FROM t WHERE id = @Id", new { Id = 999 });

        Assert.Equal(0, result);
    }

    [Fact]
    public async Task ExecuteAsync_WithTransaction_ShouldPassThroughTransaction()
    {
        var transaction = new Mock<IDbTransaction>().Object;
        _mockCtx.Setup(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), transaction, It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(2);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteAsync(conn, "UPDATE t SET x=1", null, transaction);

        Assert.Equal(2, result);
        _mockCtx.Verify(c => c.ExecuteAsync(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), transaction, It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    // --- QueryAsync ---

    [Fact]
    public async Task QueryAsync_ShouldReturnList()
    {
        var data = new List<object> { new { Id = 1 }, new { Id = 2 } };
        _mockCtx.Setup(c => c.QueryAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(data);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.QueryAsync<object>(conn, "SELECT * FROM t");

        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task QueryAsync_WhenNoRows_ShouldReturnEmptyList()
    {
        _mockCtx.Setup(c => c.QueryAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(new List<object>());

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.QueryAsync<object>(conn, "SELECT * FROM t WHERE 1=0");

        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task QueryAsync_WithParameters_ShouldPassParameters()
    {
        var param = new { Name = "test" };
        _mockCtx.Setup(c => c.QueryAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), param, It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(new List<object> { new() });

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.QueryAsync<object>(conn, "SELECT * FROM t WHERE name = @Name", param);

        Assert.Single(result);
    }

    // --- QueryFirstOrDefaultAsync ---

    [Fact]
    public async Task QueryFirstOrDefaultAsync_ShouldReturnEntity()
    {
        var expected = new { Id = 1, Name = "test" };
        _mockCtx.Setup(c => c.QueryFirstOrDefaultAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(expected);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.QueryFirstOrDefaultAsync<object>(conn, "SELECT * FROM t WHERE id = @Id", new { Id = 1 });

        Assert.NotNull(result);
        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task QueryFirstOrDefaultAsync_WhenNotFound_ShouldReturnNull()
    {
        _mockCtx.Setup(c => c.QueryFirstOrDefaultAsync<object>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync((object?)null);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.QueryFirstOrDefaultAsync<object>(conn, "SELECT * FROM t WHERE id = @Id", new { Id = 999 });

        Assert.Null(result);
    }

    // --- ExecuteScalarAsync ---

    [Fact]
    public async Task ExecuteScalarAsync_ShouldReturnScalarValue()
    {
        _mockCtx.Setup(c => c.ExecuteScalarAsync<int>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(42);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteScalarAsync<int>(conn, "SELECT COUNT(1) FROM t");

        Assert.Equal(42, result);
    }

    [Fact]
    public async Task ExecuteScalarAsync_ShouldReturnGuid()
    {
        var expected = Guid.NewGuid();
        _mockCtx.Setup(c => c.ExecuteScalarAsync<Guid>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync(expected);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteScalarAsync<Guid>(conn, "INSERT INTO t OUTPUT INSERTED.id VALUES (@V)", new { V = 1 });

        Assert.Equal(expected, result);
    }

    [Fact]
    public async Task ExecuteScalarAsync_WhenNoResult_ShouldReturnDefault()
    {
        _mockCtx.Setup(c => c.ExecuteScalarAsync<int?>(It.IsAny<IDbConnection>(), It.IsAny<string>(), It.IsAny<object?>(), It.IsAny<IDbTransaction?>(), It.IsAny<int?>(), It.IsAny<CommandType?>(), It.IsAny<CancellationToken>())).ReturnsAsync((int?)null);

        var conn = _mockCtx.Object.CreateConnection();
        var result = await _mockCtx.Object.ExecuteScalarAsync<int?>(conn, "SELECT COUNT(1) FROM t WHERE 1=0");

        Assert.Null(result);
    }
}
