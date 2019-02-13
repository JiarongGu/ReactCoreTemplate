using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

namespace ReactCoreTemplate.Services
{
    public static class SpaPrerenderingServiceLocator
    {
        public static Action<HttpContext, IDictionary<string, object>> GetProcessor(IApplicationBuilder app) {
            return (HttpContext httpContext, IDictionary<string, object> supplyData) =>
            {
                var service = app.ApplicationServices.CreateScope().ServiceProvider.GetService<ISpaPrerenderingService>();
                service.Process(httpContext, supplyData);
            };
        }
    }

    public interface ISpaPrerenderingService {
        void Process(HttpContext httpContext, IDictionary<string, object> supplyData);
    }

    public class SpaPrerenderingService: ISpaPrerenderingService
    {
        public void Process(HttpContext httpContext, IDictionary<string, object> supplyData)
        {
            supplyData["host"] = $"{httpContext.Request.Scheme}://{httpContext.Request.Host.ToString()}";
        }
    }
}
