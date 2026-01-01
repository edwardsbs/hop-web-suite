namespace auth_service.Api.Services.Auth;

public class JwtOptions
{
    public string Issuer { get; set; } = "";
    public string Audience { get; set; } = "";
    public string SigningKey { get; set; } = "";
    public int ExpiresMinutes { get; set; } = 120;
}
