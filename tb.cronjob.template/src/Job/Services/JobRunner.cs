using Microsoft.Extensions.Logging;

namespace tb.cronjob.template.Services;

public interface IJobRunner
{
    Task RunnerAsync(string[] args, CancellationToken cancellationToken);

}
public class JobRunner(ILogger<IJobRunner> logger) : IJobRunner
{
    public async Task RunnerAsync(string[] args, CancellationToken cancellationToken)
    {
        logger.LogInformation("Job Started ..");
        await Task.Run(() => logger.LogInformation("Job inProgress .."));
        logger.LogInformation("Job End ..");
    }
}