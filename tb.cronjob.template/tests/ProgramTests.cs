using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Testing;
using tb.cronjob.template.Services;


namespace tb.cronjob.template.Tests;

public class ProgramTests : IClassFixture<WebApplicationFactory<Program>>
{

    private readonly IJobRunner service;
    public ProgramTests(WebApplicationFactory<Program> factory)
    {
        var scope = factory.Services.CreateScope();
        service = scope.ServiceProvider.GetRequiredService<IJobRunner>();
    }

    [Fact]
    public void Program_Should_Initializer()
    {

        // Assert
        Assert.NotNull(service);
    }

}