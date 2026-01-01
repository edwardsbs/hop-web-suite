namespace auth_service.Api.Services.Auth.Data;

public class InMemoryStore
{
    private readonly object _lock = new();

    public List<UserRecord> Users { get; } = new();

}

public record UserRecord(string Username, string Password, string Role);
