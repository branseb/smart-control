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

	[HttpPost()]
	public IActionResult GenerateTokenAsymmetric()
	{
		using RSA rsa = RSA.Create();
		
		rsa.ImportRSAPrivateKey(
			source: Convert.FromBase64String(_configuration["Jwt:Asymmetric:PrivateKey"]),
			bytesRead: out int _);

		var id = Guid.NewGuid().ToString();

		var signingCredentials = new SigningCredentials(
			key: new RsaSecurityKey(rsa),
			algorithm: SecurityAlgorithms.RsaSha256 // Important to use RSA version of the SHA algo 
		) {
			CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
		};

		var jwt = new JwtSecurityToken(
			audience: "jwt-test-app",
			issuer: "jwt-test-app",
			claims: new Claim[] { new Claim(ClaimTypes.NameIdentifier, id) },
			signingCredentials: signingCredentials
		);

		string token = new JwtSecurityTokenHandler().WriteToken(jwt);

		return Ok(new
		{
			Token = token,
			Id = id
		});
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
}
