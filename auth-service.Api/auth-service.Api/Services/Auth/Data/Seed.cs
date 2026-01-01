namespace auth_service.Api.Services.Auth.Data;

public class Seed
{
    public static void Run(InMemoryStore store)
    {
        store.Users.Clear();
        store.Users.AddRange(new[]
        {
            new UserRecord("admin", "admin", "Admin"),
            new UserRecord("editor", "editor", "Editor"),
            new UserRecord("viewer", "viewer", "Viewer"),
        });

    }
}
