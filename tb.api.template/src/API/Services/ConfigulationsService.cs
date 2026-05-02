namespace tb.api.template.API.Services;
using Microsoft.Extensions.Options;
using tb.api.template.API.Domain.Configurations;

public interface IConfigurationsService
{
    public ConnectionStrings ConnectionStrings { get; }

}

public class ConfigurationsService(IServiceProvider serviceProvider) : IConfigurationsService
{
    public ConnectionStrings ConnectionStrings => serviceProvider.GetRequiredService<IOptions<ConnectionStrings>>().Value;
}