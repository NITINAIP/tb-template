
namespace tb.cronjob.template.Repositories.Models;

public interface IExampleModel
{
    Guid Id { get; }
    string Name { get; }
    bool Active { get; }
}
public class ExampleModel : IExampleModel
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public bool Active { get; set; }
}