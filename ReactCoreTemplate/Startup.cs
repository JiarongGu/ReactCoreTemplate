using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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
                // we currently have /build/desktop as our client location
                // you may also have other client like /build/{client folder}
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

            // lets do redirect before pipeline
            app.UseHttpsRedirection();

            // put api route to the front, we want to use the same end point of api
            app.Map("/api", apiApp => {
                apiApp.UseMvc(routes => routes.MapRoute("default", "{controller}/{action=Index}/{id?}"));
            });
            
            // Add URL prefix, so all middleware below will follow the new request URL
            app.Use((context, next) =>
            {
                // you can have different conditions to add different prefixes
                context.Request.Path = "/desktop" + context.Request.Path;
                return next.Invoke();
            });

            // now the static files will be served by new request URL
            app.UseStaticFiles();

            // use map to remove the prefix and go to the real file location
            app.Map("/desktop", spaApp =>
                spaApp.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp/build";
                    // because the root is 'ClientApp/build' 
                    // so we need to use the index.html in desktop folder for SSR
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
