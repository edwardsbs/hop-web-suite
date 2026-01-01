namespace auth_service.Api.Services.Auth.Dtos;

public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username, string Role);