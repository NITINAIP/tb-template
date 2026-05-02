using Moq;
using tb.api.template.API.Domain.Entities;
using tb.api.template.API.DTOs;
using tb.api.template.API.DTOs.ApiAuthentication;
using tb.api.template.API.Infrastructure.Repositories;
using tb.api.template.API.Services;

namespace tb.api.template.API.Tests.Services;

public class ApiAuthenticationServiceTests
{
    private readonly Mock<ITniDataServiceContext> _mockCtx = new();
    private readonly Mock<ITbApiAuthenticationRepo> _mockRepo = new();
    private readonly ApiAuthenticationService _service;

    public ApiAuthenticationServiceTests()
    {
        _mockCtx.Setup(c => c.TbApiAuthenticationRepo).Returns(_mockRepo.Object);
        _service = new ApiAuthenticationService(_mockCtx.Object);
    }

    [Fact]
    public async Task CreateAsync_WithValidDto_ShouldReturnNewId()
    {
        // Arrange
        var dto = new ApiAuthenticationDto
        {
            AccountUser = "user1",
            AccountName = "User One",
            AppId = "app1",
            AppKey = "key1",
            Active = true
        };
        var expectedId = Guid.NewGuid();
        _mockRepo.Setup(r => r.CreateAsync(It.IsAny<TbApiAuthentication>(), It.IsAny<CancellationToken>()))
                 .ReturnsAsync(expectedId);

        // Act
        var result = await _service.CreateAsync(dto);

        // Assert
        Assert.Equal(expectedId, result);
        _mockRepo.Verify(r => r.CreateAsync(It.Is<TbApiAuthentication>(e => e.AccountUser == "user1"), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_WithInvalidRequest_ShouldThrowNotImplementedException()
    {
        // Arrange
        var invalidRequest = new object();

        // Act & Assert
        await Assert.ThrowsAsync<NotImplementedException>(() => _service.CreateAsync(invalidRequest));
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingId_ShouldReturnDto()
    {
        // Arrange
        var id = Guid.NewGuid();
        var entity = new TbApiAuthentication { Id = id, AccountUser = "user1", AccountName = "User One", AppId = "app1", AppKey = "key1", Active = true };
        _mockRepo.Setup(r => r.GetByIdAsync(id, It.IsAny<CancellationToken>()))
                 .ReturnsAsync(entity);

        // Act
        var result = await _service.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        var dto = Assert.IsType<SearchResultApiAuthenticationDto>(result);
        Assert.Equal(id, dto.Id);
        Assert.Equal("user1", dto.AccountUser);
    }

    [Fact]
    public async Task GetByIdAsync_WithNonExistingId_ShouldReturnNull()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.GetByIdAsync(id, It.IsAny<CancellationToken>()))
                 .ReturnsAsync((TbApiAuthentication?)null);

        // Act
        var result = await _service.GetByIdAsync(id);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task UpdateAsync_WithValidDto_ShouldReturnAffectedRows()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new ApiAuthenticationDto { AccountUser = "user1", AccountName = "User One", AppId = "app1", AppKey = "key1", Active = true };
        _mockRepo.Setup(r => r.UpdateAsync(It.IsAny<TbApiAuthentication>(), It.IsAny<CancellationToken>()))
                 .ReturnsAsync(1);

        // Act
        var result = await _service.UpdateAsync(dto, id);

        // Assert
        Assert.Equal(1, result);
        _mockRepo.Verify(r => r.UpdateAsync(It.Is<TbApiAuthentication>(e => e.Id == id && e.AccountUser == "user1"), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_WithInvalidRequest_ShouldThrowNotImplementedException()
    {
        // Arrange
        var id = Guid.NewGuid();

        // Act & Assert
        await Assert.ThrowsAsync<NotImplementedException>(() => _service.UpdateAsync(new object(), id));
    }

    [Fact]
    public async Task DeleteAsync_ShouldReturnTrue()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id, It.IsAny<CancellationToken>()))
                 .ReturnsAsync(true);

        // Act
        var result = await _service.DeleteAsync(id);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task DeleteAsync_WhenNotFound_ShouldReturnFalse()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockRepo.Setup(r => r.DeleteAsync(id, It.IsAny<CancellationToken>()))
                 .ReturnsAsync(false);

        // Act
        var result = await _service.DeleteAsync(id);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public async Task DeletesAsync_ShouldReturnTrue()
    {
        // Arrange
        var ids = new[] { Guid.NewGuid(), Guid.NewGuid() };
        _mockRepo.Setup(r => r.DeletesAsync(ids, It.IsAny<CancellationToken>()))
                 .ReturnsAsync(true);

        // Act
        var result = await _service.DeletesAsync(ids);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task SearchAsync_WithValidRequest_ShouldReturnSearchResult()
    {
        // Arrange
        var entities = new TbApiAuthentication[]
        {
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user1", AccountName = "User One", AppId = "app1", AppKey = "key1", Active = true },
            new TbApiAuthentication { Id = Guid.NewGuid(), AccountUser = "user2", AccountName = "User Two", AppId = "app2", AppKey = "key2", Active = false }
        };
        _mockRepo.Setup(r => r.SearchAsync(It.IsAny<TbApiAuthentication>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                 .ReturnsAsync((entities, entities.Length));

        var request = new SearchRequest<ApiAuthenticationDto>
        {
            Filter = new ApiAuthenticationDto { AccountUser = "user" },
            Page = 1,
            Limit = 10
        };

        // Act
        var result = await _service.SearchAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.TotalItems);
        Assert.Equal(2, result.Items.Length);
        Assert.Equal(1, result.Page);
        Assert.Equal(10, result.Limit);
    }

    [Fact]
    public async Task SearchAsync_WithNullFilter_ShouldUseEmptyFilter()
    {
        // Arrange
        _mockRepo.Setup(r => r.SearchAsync(It.IsAny<TbApiAuthentication>(), 1, 10, It.IsAny<CancellationToken>()))
                 .ReturnsAsync((Array.Empty<TbApiAuthentication>(), 0));

        var request = new SearchRequest<ApiAuthenticationDto> { Filter = null, Page = 1, Limit = 10 };

        // Act
        var result = await _service.SearchAsync(request);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(0, result.TotalItems);
    }

    [Fact]
    public async Task SearchAsync_WithInvalidRequest_ShouldThrowNotImplementedException()
    {
        // Act & Assert
        await Assert.ThrowsAsync<NotImplementedException>(() => _service.SearchAsync(new object()));
    }
}
