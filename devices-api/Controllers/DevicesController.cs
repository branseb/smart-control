using Microsoft.AspNetCore.Mvc;

[ApiController]
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
        return _devicesService.GetDevices();
    }

	[HttpGet("detail")]
    public DeviceDetail Get(string id)
    {
        return _devicesService.GetDeviceDetail(id);
    }
}
