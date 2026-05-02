using System.Text.Json.Serialization;
using Mapster;
using Serilog;
using tb.api.template.API.Domain.Configurations;
using tb.api.template.API.Infrastructure.Data;
using tb.api.template.API.Infrastructure.Repositories;
using tb.api.template.API.Middlewares;
using tb.api.template.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
  .AddJsonOptions(options =>
  {
      options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
  });
// Serilog configuration
builder.Host.UseSerilog((ctx, lc) =>
{
    var serilogConfig = new ConfigurationBuilder()
        .SetBasePath(AppContext.BaseDirectory)
        .AddJsonFile("serilog.json", optional: false, reloadOnChange: true)
        .Build();

    lc.ReadFrom.Configuration(serilogConfig);
});
builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection("ConnectionStrings"));
builder.Services.AddSingleton<IConfigurationsService, ConfigurationsService>();
builder.Services.AddScoped<IDapperContext, DapperContext>();
builder.Services.AddScoped<ITniDataServiceContext, TniDataServiceContext>();
builder.Services.AddScoped<IApiAuthenticationService, ApiAuthenticationService>();
// builder.Services.AddScoped<IProvinceService, ProvinceService>();
builder.Services.AddScoped(typeof(IApiHandler<,>), typeof(ApiHandler<,>));

builder.Services.AddMapster();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionHandler>();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();


namespace tb.api.template.API
{
    public partial class Program { }
}