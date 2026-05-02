using Moq;
using tb.api.template.API.Domain.Entities;
using tb.api.template.API.Infrastructure.Data;
using tb.api.template.API.Infrastructure.Repositories;
using tb.api.template.API.Tests.Mocks;

namespace tb.api.template.API.Tests.Infrastructures.Repositories;

public class TbApiAuthenticationRepoTests
{
    readonly Mock<IDapperContext> _mockContext = new();
    public TbApiAuthenticationRepo _repo => new(_mockContext.Object);
    public TbApiAuthenticationRepoTests()
    {
        _mockContext.MockDapperDefault<TbApiAuthentication>();
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnList()
    {
        // Arrange
        var data = new List<TbApiAuthentication>
        {
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user1" },
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user2" }
        };
        _mockContext.MockDapperQueryAsync(data);

        // Act
        var result = await _repo.GetAllAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnEntity()
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new TbApiAuthentication { Id = id, AccountUser = "user1" };
        _mockContext.MockDapperQueryFirstOrDefaultAsync(entity);

        // Act
        var result = await _repo.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(id, result.Id);
    }

    [Fact]
    public async Task CreateAsync_ShouldReturnNewId()
    {
        // Arrange
        var newId = Guid.NewGuid();
        var entity = new TbApiAuthentication { AccountUser = "user1" };
        _mockContext.MockExecuteScalarAsyncStruct(newId);
        // Act
        var result = await _repo.CreateAsync(entity);

        // Assert
        Assert.Equal(newId, result);
    }

    // UpdateAsync
    [Fact]
    public async Task UpdateAsync_ShouldReturnAffectedRows()
    {
        // Arrange
        var entity = new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user1" };
        _mockContext.MockDapperExecuteAsync(1);
        // Act
        var result = await _repo.UpdateAsync(entity);
        // Assert
        Assert.Equal(1, result);
    }

    // DeleteAsync
    [Fact]
    public async Task DeleteAsync_ShouldReturnTrue()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockContext.MockDapperExecuteAsync(1);
        // Act
        var result = await _repo.DeleteAsync(id);
        // Assert
        Assert.True(result);
    }

    // DeletesAsync
    [Fact]
    public async Task DeletesAsync_ShouldReturnTrue()
    {
        // Arrange
        var ids = new[] { Guid.NewGuid(), Guid.NewGuid() };
        _mockContext.MockDapperExecuteAsync(2);
        // Act
        var result = await _repo.DeletesAsync(ids);
        // Assert
        Assert.True(result);
    }

    // SearchAsync
    [Fact]
    public async Task SearchAsync_ShouldReturnResults()
    {
        // Arrange
        var filter = new TbApiAuthentication { AccountUser = "user1" };
        var data = new List<TbApiAuthentication>
        {
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user1" },
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user1" }
        };
        _mockContext.MockDapperSearchQueryAsync(data);

        // Act
        var (result, totalCount) = await _repo.SearchAsync(filter,1,10, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.Equal(2, totalCount);
    }
}
