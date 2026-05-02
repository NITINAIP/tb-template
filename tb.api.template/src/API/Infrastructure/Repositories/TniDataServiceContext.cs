using tb.api.template.API.Infrastructure.Data;

namespace tb.api.template.API.Infrastructure.Repositories;

public interface ITniDataServiceContext
{
    ITbApiAuthenticationRepo TbApiAuthenticationRepo { get; }
}
public class TniDataServiceContext(IDapperContext ctx) : ITniDataServiceContext
{
    public ITbApiAuthenticationRepo TbApiAuthenticationRepo => new TbApiAuthenticationRepo(ctx);
}