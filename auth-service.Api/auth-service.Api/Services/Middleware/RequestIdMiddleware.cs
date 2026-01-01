namespace auth_service.Api.Services.Middleware;

public class RequestIdMiddleware
{
    private readonly RequestDelegate _next;
    public RequestIdMiddleware(RequestDelegate next) => _next = next;

    public async Task Invoke(HttpContext ctx)
    {
        var rid = Guid.NewGuid().ToString("N");
        ctx.Items["rid"] = rid;
        ctx.Response.Headers["x-request-id"] = rid;
        await _next(ctx);
    }
}
