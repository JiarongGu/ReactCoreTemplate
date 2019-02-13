using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace ReactCoreTemplate.Services
{
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
