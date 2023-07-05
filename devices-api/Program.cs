using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("http://127.0.0.1:5173", "http://localhost:5173")
								.AllowAnyHeader()
								.AllowAnyMethod();
					  });
});

builder.Services
	.AddAuthentication(options =>
	{
		options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	}).AddJwtBearer(o => {
		o.SecurityTokenValidators.Clear();
		o.SecurityTokenValidators.Add(new GoogleTokenValidator());
	});

// Add services to the container.

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
