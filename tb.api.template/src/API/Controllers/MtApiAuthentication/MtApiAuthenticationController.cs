using Microsoft.AspNetCore.Mvc;
using tb.api.template.API.Controllers.MtApiAuthentication;
using tb.api.template.API.Services;

namespace tb.api.template.API.Controllers;

[ApiController]
[Route("api/mt-api-authentication")]
public sealed class MtApiAuthenticationController(IApiHandler<IApiAuthenticationService, Guid> apiHandler) : MtApiAuthenticationBase(apiHandler)
{

}
