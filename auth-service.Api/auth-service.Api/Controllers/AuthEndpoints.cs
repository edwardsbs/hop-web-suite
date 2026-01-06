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
            //replace this with actual User lookup
            var user = store.Users.SingleOrDefault(u => u.Username == req.Username);

            //user lookup here
            // --[code here]--
            //

            if (user is null || user.Password != req.Password)
                return Results.Unauthorized();

            var permissions = new List<AppPermissionDto>();
            permissions.Add(new AppPermissionDto { Feature="lock", PropertyName="can see", PropertyValue="true" });
            permissions.Add(new AppPermissionDto { Feature="save new records", PropertyName="can see", PropertyValue="false" });
            permissions.Add(new AppPermissionDto { Feature="edit existing records", PropertyName="can see", PropertyValue="true" });

            var token = jwt.CreateToken(user.Username, user.Role, "any", permissions);
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
