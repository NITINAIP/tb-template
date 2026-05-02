namespace tb.api.template.API.Services;

public interface IApiHandler<TService, TKey>
{
    TService Service { get; }
    ILogger Logger { get; }
}
public class ApiHandler<TService, TKey> : IApiHandler<TService, TKey>
where TService : ICrudServiceBase<TKey>
{
    protected readonly TService _service;
    protected readonly ILogger<ApiHandler<TService, TKey>> _logger;
    public ApiHandler(TService service, ILogger<ApiHandler<TService, TKey>> logger)
    {
        _service = service;
        _logger = logger;
    }

    public TService Service => _service;
    public ILogger Logger => _logger;
}