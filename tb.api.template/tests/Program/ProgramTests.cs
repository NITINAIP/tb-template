using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

using tb.api.template.API.Infrastructure.Data;
using tb.api.template.API.Infrastructure.Repositories;
using tb.api.template.API.Services;

namespace tb.api.template.API.Tests.Program;

public class ProgramTests : IClassFixture<WebApplicationFactory<tb.api.template.API.Program>>
{
    private readonly WebApplicationFactory<tb.api.template.API.Program> _factory;

    public ProgramTests(WebApplicationFactory<tb.api.template.API.Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("Development");
            builder.ConfigureTestServices(services =>
            {
                // Replace real DB context with mock to avoid DB connection during tests
                services.AddScoped<IDapperContext, MockDapperContext>();
            });
        });
    }

    [Fact]
    public async Task App_ShouldStart_AndSwaggerIsAccessible()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/swagger/index.html");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task App_UnknownRoute_ShouldReturn404()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/non-existent-route");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public void App_ShouldRegister_IDapperContext()
    {
        using var scope = _factory.Services.CreateScope();
        var service = scope.ServiceProvider.GetService<IDapperContext>();
        Assert.NotNull(service);
    }

    [Fact]
    public void App_ShouldRegister_ITniDataServiceContext()
    {
        using var scope = _factory.Services.CreateScope();
        var service = scope.ServiceProvider.GetService<ITniDataServiceContext>();
        Assert.NotNull(service);
    }

    [Fact]
    public void App_ShouldRegister_IApiAuthenticationService()
    {
        using var scope = _factory.Services.CreateScope();
        var service = scope.ServiceProvider.GetService<IApiAuthenticationService>();
        Assert.NotNull(service);
    }

    [Fact]
    public void App_ShouldRegister_IApiHandler()
    {
        using var scope = _factory.Services.CreateScope();
        var service = scope.ServiceProvider.GetService<IApiHandler<IApiAuthenticationService, Guid>>();
        Assert.NotNull(service);
    }

    [Fact]
    public async Task GlobalExceptionHandler_OnNotFoundException_ShouldReturn404WithJson()
    {
        // Arrange — inject a service that throws NotFoundException
        var factory = _factory.WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("Development");
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<IDapperContext, MockDapperContext>();
                services.AddScoped<IApiAuthenticationService, ThrowNotFoundApiAuthenticationService>();
            });
        });
        var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/mt-api-authentication/find/00000000-0000-0000-0000-000000000001");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("NotFound", body);
    }

    [Fact]
    public async Task GlobalExceptionHandler_OnUnhandledException_ShouldReturn500WithJson()
    {
        // Arrange — inject a service that throws a generic exception
        var factory = _factory.WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("Development");
            builder.ConfigureTestServices(services =>
            {
                services.AddScoped<IDapperContext, MockDapperContext>();
                services.AddScoped<IApiAuthenticationService, ThrowGenericApiAuthenticationService>();
            });
        });
        var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/mt-api-authentication/find/00000000-0000-0000-0000-000000000001");

        // Assert
        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("InternalServerError", body);
    }
}
