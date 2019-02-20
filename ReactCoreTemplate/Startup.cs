using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReactCoreTemplate.Services;

namespace ReactCoreTemplate
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<ISpaPrerenderingService, SpaPrerenderingService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.Map("/api", apiApp => {
                apiApp.UseMvc(routes => routes.MapRoute("default", "{controller}/{action=Index}/{id?}"));
            });
            
            // add URL prefix
            app.Use((context, next) =>
            {
                var userAgent = context.Request.Headers["User-Agent"].ToString();

                // check if user agent is mobile (fake function)
                if (userAgent == "mobile")
                {
                    context.Request.Path = "/mobile" + context.Request.Path;
                }
                else
                {
                    context.Request.Path = "/desktop" + context.Request.Path;
                }

                return next.Invoke();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.Map("/mobile", spaApp =>
                spaApp.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp/build";
                    spa.Options.DefaultPage = "/mobile/index.html";
                    spa.UseSpaPrerendering(options =>
                    {
                        options.BootModulePath = $"{spa.Options.SourcePath}/mobile/server/bundle.js";
                        options.SupplyData = SpaPrerenderingServiceLocator.GetProcessor(app);
                    });
                })
            );

            app.Map("/desktop", spaApp =>
                spaApp.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp/build";
                    spa.Options.DefaultPage = "/desktop/index.html";
                    spa.UseSpaPrerendering(options =>
                    {
                        options.BootModulePath = $"{spa.Options.SourcePath}/desktop/server/bundle.js";
                        options.SupplyData = SpaPrerenderingServiceLocator.GetProcessor(app);
                    });
                })
            );
        }
    }
}
