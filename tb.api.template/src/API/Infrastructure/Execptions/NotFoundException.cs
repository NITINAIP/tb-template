namespace tb.api.template.API.Infrastructure.Execptions;
public sealed class NotFoundException(string Messages) : Exception(Messages)
{

}