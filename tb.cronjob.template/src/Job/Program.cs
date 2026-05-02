using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using tb.cronjob.template.Repositories;
using tb.cronjob.template.Services;

var builder = Host.CreateApplicationBuilder(args);

// Clear default providers to prevent duplicate logs; Serilog is the sole provider.
builder.Logging.ClearProviders();
builder.Services.AddSerilog((services, cfg) =>
{
    cfg
        .ReadFrom.Configuration(builder.Configuration)
        .ReadFrom.Services(services);
});
builder.Services.AddHttpClient();
builder.Services.AddSingleton(TimeProvider.System);
builder.Configuration.AddEnvironmentVariables();
builder.Services.AddTransient<IJobContext, JobContext>(sp =>
    new(new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")))
);
builder.Services.AddScoped<IJobRunner, JobRunner>();
var app = builder.Build();
var scope = app.Services.CreateAsyncScope();
var sp = scope.ServiceProvider.GetRequiredService<IJobRunner>();
using var canc = new CancellationTokenSource();
canc.CancelAfter(TimeSpan.FromHours(1));
await sp.RunnerAsync(args, canc.Token);

namespace tb.cronjob.template
{
    public partial class Program { }
}