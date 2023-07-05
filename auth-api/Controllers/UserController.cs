using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
	public class AuthenticateRequest
	{
		[Required]
		public string? IdToken { get; set; }
	}

	private readonly JwtGenerator _jwtGenerator;

	public UserController(IConfiguration configuration)
	{
		_jwtGenerator = new JwtGenerator(configuration.GetValue<string>("JwtPrivateSigningKey"));
	}

	[AllowAnonymous]
	[HttpPost("authenticate")]
	public IActionResult Authenticate([FromBody] AuthenticateRequest data)
	{
		GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();

		// Change this to your google client ID
		settings.Audience = new List<string>() { "13195522899-8f1dobdejs29mbk5vgto74klhmb320ro.apps.googleusercontent.com" };

		GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;
		return Ok(new { AuthToken = _jwtGenerator.CreateUserAuthToken(payload.Email, payload.Picture) });
	}
}