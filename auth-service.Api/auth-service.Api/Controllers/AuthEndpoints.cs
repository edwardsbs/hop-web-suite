using auth_service.Api.Services.Auth;
using auth_service.Api.Services.Auth.Data;
using auth_service.Api.Services.Auth.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace auth_service.Api.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", ([FromBody] LoginRequest req, InMemoryStore store, JwtTokenService jwt) =>
        {
            var user = store.Users.SingleOrDefault(u => u.Username == req.Username);
            if (user is null || user.Password != req.Password)
                return Results.Unauthorized();

            var token = jwt.CreateToken(user.Username, user.Role);
            return Results.Ok(new LoginResponse(token, user.Username, user.Role));
        });

        app.MapGet("/api/auth/validate", [Authorize] (ClaimsPrincipal user) =>
        {
            return Results.Ok(new
            {
                name = user.Identity?.Name,
                sub = user.FindFirstValue(ClaimTypes.NameIdentifier),
                role = user.FindFirstValue(ClaimTypes.Role)
            });
        });

        return app;
    }
}
