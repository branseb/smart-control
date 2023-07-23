using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[HttpResponseExceptionFilter]
[Route("[controller]")]
public class DeviceController : ControllerBase
{
    private readonly ILogger<DevicesController> _logger;
    private readonly IDevicesService _devicesService;
    private readonly IConfiguration _configuration;

    public DeviceController(ILogger<DevicesController> logger, IDevicesService devicesService, IConfiguration configuration)
    {
        _logger = logger;
        _devicesService = devicesService;
        _configuration = configuration;
    }

    [HttpPost("uploadState")]
    [Authorize(AuthenticationSchemes = "asymmetric")]
    public IActionResult UploadState(DeviceDetail state)
    {
        var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (id != state.Id)
            return Forbid();

        _devicesService.UpdateDevice(state);
        return Ok();
    }

    [HttpPost("startPairing")]
    [Authorize(AuthenticationSchemes = "asymmetric")]
    public IActionResult StartPairing(string pin)
    {
        var id = this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (id == null)
            return BadRequest();

        _devicesService.StartPairing(pin, id);
        return Ok();
    }

    [HttpPost("pair")]
    [Authorize(AuthenticationSchemes = "google")]
    public IActionResult Pair(string id, string pin)
    {
        var email = this.User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

        if (email == null)
            return BadRequest();

        _devicesService.Pair(email, id, pin);
        return Ok("device paired");
    }

    [HttpPost("addRole")]
    [Authorize(AuthenticationSchemes = "google")]
    public IActionResult AddRoleToDevice(string email, string deviceId, RoleStatus roleStatus)
    {
        var userEmail = this.User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

        if (userEmail == null)
            return BadRequest();

        _devicesService.AddRoleToDevice(userEmail, email, deviceId, roleStatus);
        return Ok(" device have a new user");
    }
}
