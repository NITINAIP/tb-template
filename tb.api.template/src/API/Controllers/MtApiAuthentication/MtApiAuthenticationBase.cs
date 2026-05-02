using tb.api.template.API.DTOs.ApiAuthentication;
using tb.api.template.API.Services;

namespace tb.api.template.API.Controllers.MtApiAuthentication;
public abstract class MtApiAuthenticationBase(IApiHandler<IApiAuthenticationService, Guid> apiHandler) : CrudControllerBase<ApiAuthenticationDto, Guid, IApiAuthenticationService>(apiHandler)
{

}