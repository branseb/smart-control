using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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

	[HttpGet]
	[Authorize(AuthenticationSchemes = "asymmetric")]
	public IActionResult ValidateTokenAsymmetric()
	{
		return Ok(new {
			Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
			Data = "Secret information"
		});
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
}
