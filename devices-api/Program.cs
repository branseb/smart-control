using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:5173")
								.AllowAnyHeader()
								.AllowAnyMethod();
					  });
});

builder.Services
	.AddAuthentication(options =>
	{
		// options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
		// options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		// options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	})
	.AddJwtBearer("google", o =>
	{
		o.SecurityTokenValidators.Clear();
		o.SecurityTokenValidators.Add(new GoogleTokenValidator());
	})
	.AddJwtBearer("asymmetric", options =>
	{
		SecurityKey rsa = builder.Services.BuildServiceProvider().GetRequiredService<RsaSecurityKey>();
		options.IncludeErrorDetails = true;
		options.TokenValidationParameters = new TokenValidationParameters
		{
			IssuerSigningKey = rsa,
			ValidAudience = "jwt-test-app",
			ValidIssuer = "jwt-test-app",
			RequireSignedTokens = true,
			RequireExpirationTime = false,
			ValidateLifetime = false,
			ValidateAudience = true,
			ValidateIssuer = true,
		};
	});

builder.Services
    .AddAuthorization(options =>
    {
        options.DefaultPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .AddAuthenticationSchemes("google", "asymmetric")
            .Build();
    });

builder.Services.AddSingleton<RsaSecurityKey>(provider =>
{
	RSA rsa = RSA.Create();
	rsa.ImportRSAPublicKey(
		source: Convert.FromBase64String(builder.Configuration["Jwt:Asymmetric:PublicKey"]),
		bytesRead: out int _
	);
	return new RsaSecurityKey(rsa);
});

// Add services to the container.
builder.Services.AddSingleton<IDevicesService, DevicesService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
