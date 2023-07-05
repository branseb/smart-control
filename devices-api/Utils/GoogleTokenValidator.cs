using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

public class GoogleTokenValidator : ISecurityTokenValidator
{
	private readonly JwtSecurityTokenHandler _tokenHandler;

	public GoogleTokenValidator()
	{
		_tokenHandler = new JwtSecurityTokenHandler();
	}

	public bool CanValidateToken => true;

	public int MaximumTokenSizeInBytes { get; set; } = TokenValidationParameters.DefaultMaximumTokenSizeInBytes;

	public bool CanReadToken(string securityToken)
	{
		return _tokenHandler.CanReadToken(securityToken);
	}

	public ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
	{
		validatedToken = null;

		GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
		settings.Audience = new List<string>() { "13195522899-8f1dobdejs29mbk5vgto74klhmb320ro.apps.googleusercontent.com" };
		var payload = GoogleJsonWebSignature.ValidateAsync(securityToken, settings).Result;

		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, payload.Name),
			new Claim(ClaimTypes.Name, payload.Name),
			new Claim(JwtRegisteredClaimNames.FamilyName, payload.FamilyName),
			new Claim(JwtRegisteredClaimNames.GivenName, payload.GivenName),
			new Claim(JwtRegisteredClaimNames.Email, payload.Email),
			new Claim(JwtRegisteredClaimNames.Sub, payload.Subject),
			new Claim(JwtRegisteredClaimNames.Iss, payload.Issuer),
			new Claim("picture", payload.Picture),
		};

		validatedToken = _tokenHandler.ReadJwtToken(securityToken);

		try
		{
			var principle = new ClaimsPrincipal();
			principle.AddIdentity(new ClaimsIdentity(claims, JwtBearerDefaults.AuthenticationScheme));
			return principle;
		}
		catch (Exception e)
		{
			Console.WriteLine(e);
			throw;
		}
	}
}