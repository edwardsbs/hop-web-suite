using auth_service.Api.Services.Auth;
using auth_service.Api.Services.Auth.Data;
using auth_service.Api.Services.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using auth_service.Api.Endpoints;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InMemoryStore>();
builder.Services.AddSingleton<JwtTokenService>();

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));

var jwt = builder.Configuration.GetSection("Jwt").Get<JwtOptions>()!;
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.SigningKey));

builder.Services
   .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = key,
            ClockSkew = TimeSpan.FromSeconds(10),
        };
    });

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        opt.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
    }
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseSwaggerUi(options =>
    //{
    //    options.SwaggerEndpoint("/openapi/v1.json", "API v1");
    //    //options.RoutePrefix = "swagger"; // /swagger
    //});
}

app.UseMiddleware<RequestIdMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

Seed.Run(app.Services.GetRequiredService<InMemoryStore>());

app.MapAuthEndpoints();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
