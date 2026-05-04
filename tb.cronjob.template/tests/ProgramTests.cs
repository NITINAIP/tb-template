using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using tb.cronjob.template.Services;
namespace tb.cronjob.template.Tests;

public class ProgramTests : IClassFixture<WebApplicationFactory<Program>>
{

    private IJobRunner service;
    private readonly WebApplicationFactory<Program> _factory;
    public ProgramTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
       {
           builder.UseEnvironment("Development");
           builder.ConfigureTestServices(services =>
           {
               // Replace real DB context with mock to avoid DB connection during tests
               services.AddScoped<IJobRunner, JobRunner>();
           });
       });

    }

    [Fact]
    public void Program_Should_Initializer()
    {
        using var scope = _factory.Services.CreateScope();
        service = scope.ServiceProvider.GetRequiredService<IJobRunner>();
        // Assert
        Assert.NotNull(service);
    }

}