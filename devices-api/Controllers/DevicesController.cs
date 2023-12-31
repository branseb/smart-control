using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Authorize(AuthenticationSchemes = "google")]
[HttpResponseExceptionFilter]
[Route("[controller]")]
public class DevicesController : ControllerBase
{
    private readonly ILogger<DevicesController> _logger;
    private readonly IDevicesService _devicesService;

    public DevicesController(ILogger<DevicesController> logger, IDevicesService devicesService)
    {
        _logger = logger;
        _devicesService = devicesService;
    }

    [HttpGet]
    public IEnumerable<DeviceItem> Get()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value ?? "";
        return _devicesService.GetDevices(userId);
    }

    [HttpGet("detail")]
    public DeviceDetail Get(string id)
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value ?? "";
        return _devicesService.GetDeviceDetail(id, userId);
    }

    [HttpGet("user")]
    public ActionResult GetUser()
    {
        return Ok(new
        {
            Picture = User.FindFirst("picture")?.Value,
            Email = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value
        });
    }
}
