using System.Data;

namespace tb.cronjob.template.Repositories;
public interface IJobContext
{
    IExampleRepo ExampleRepo { get; }
}

public class JobContext(IDbConnection dbConnection) : IJobContext
{
    readonly IDbConnection _dbConnection = dbConnection;

    public IExampleRepo ExampleRepo => new ExampleRepo(_dbConnection);
}