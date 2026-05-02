using System.Data;

namespace tb.cronjob.template.Repositories;

public interface IExampleRepo
{

}

public class ExampleRepo(IDbConnection dbConnection) : IExampleRepo
{

}