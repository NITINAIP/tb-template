using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using tb.api.template.API.Controllers;
using tb.api.template.API.DTOs;
using tb.api.template.API.DTOs.ApiAuthentication;
using tb.api.template.API.Services;

namespace tb.api.template.API.Tests.Controllers;

public class MtApiAuthenticationControllerTests
{
    private readonly Mock<IApiAuthenticationService> _mockService = new();
    private readonly Mock<ILogger<ApiHandler<IApiAuthenticationService, Guid>>> _mockLogger = new();
    private readonly Mock<IApiHandler<IApiAuthenticationService, Guid>> _mockApiHandler = new();
    private readonly MtApiAuthenticationController _controller;

    public MtApiAuthenticationControllerTests()
    {
        _mockApiHandler.Setup(h => h.Service).Returns(_mockService.Object);
        _mockApiHandler.Setup(h => h.Logger).Returns(_mockLogger.Object);
        _controller = new MtApiAuthenticationController(_mockApiHandler.Object);
    }

    [Fact]
    public async Task SearchAsync_ShouldReturnOkWithResult()
    {
        // Arrange
        var searchResult = new SearchResult<object>
        {
            Items = new object[]
            {
                new SearchResultApiAuthenticationDto { Id = Guid.NewGuid(), AccountUser = "user1" }
            },
            TotalItems = 1,
            Page = 1,
            Limit = 10
        };
        _mockService.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<ApiAuthenticationDto>>(), It.IsAny<CancellationToken>()))
                    .ReturnsAsync(searchResult);

        var request = new SearchRequest<ApiAuthenticationDto> { Page = 1, Limit = 10 };

        // Act
        var actionResult = await _controller.SearchAsync(request);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
    }

    [Fact]
    public async Task FindAsync_WithExistingId_ShouldReturnOkWithDto()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new SearchResultApiAuthenticationDto { Id = id, AccountUser = "user1" };
        _mockService.Setup(s => s.GetByIdAsync(id, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(dto);

        // Act
        var actionResult = await _controller.FindAsync(id);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
    }

    [Fact]
    public async Task FindAsync_WithNonExistingId_ShouldReturnOkWithNullData()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockService.Setup(s => s.GetByIdAsync(id, It.IsAny<CancellationToken>()))
                    .ReturnsAsync((object?)null);

        // Act
        var actionResult = await _controller.FindAsync(id);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
        Assert.Null(result.Data);
    }

    [Fact]
    public async Task CreateAsync_ShouldReturnOkWithNewId()
    {
        // Arrange
        var dto = new ApiAuthenticationDto { AccountUser = "user1", AccountName = "User One", AppId = "app1", AppKey = "key1", Active = true };
        var newId = Guid.NewGuid();
        _mockService.Setup(s => s.CreateAsync(dto, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(newId);

        // Act
        var actionResult = await _controller.CreateAsync(dto);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnOkWithAffectedRows()
    {
        // Arrange
        var id = Guid.NewGuid();
        var dto = new ApiAuthenticationDto { AccountUser = "user1", AccountName = "User One", AppId = "app1", AppKey = "key1", Active = true };
        _mockService.Setup(s => s.UpdateAsync(dto, id, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(1);

        // Act
        var actionResult = await _controller.UpdateAsync(dto, id);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
    }

    [Fact]
    public async Task DeleteAsync_ShouldReturnOkWithTrue()
    {
        // Arrange
        var id = Guid.NewGuid();
        _mockService.Setup(s => s.DeleteAsync(id, It.IsAny<CancellationToken>()))
                    .ReturnsAsync(true);

        // Act
        var actionResult = await _controller.DeleteAsync(id);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(actionResult);
        var result = Assert.IsType<Result<object>>(ok.Value);
        Assert.True(result.Success);
    }
}
