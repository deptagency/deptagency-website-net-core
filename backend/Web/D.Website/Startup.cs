using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using D.Models.Website.Configuration;
using D.Models.Website.Interfaces;
using D.Services.Greenhouse;

namespace D.Website
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc(options =>
            {
                options.CacheProfiles.Add("Default",
                    new CacheProfile()
                    {
                        Duration = 60
                    });
                options.CacheProfiles.Add("Never",
                    new CacheProfile()
                    {
                        Location = ResponseCacheLocation.None,
                        NoStore = true
                    });
            });

            services.Configure<VacanciesServiceConfiguration>(Configuration.GetSection("VacanciesService"));

            services.AddSingleton<IConfiguration>(Configuration);

            services.AddScoped<IVacanciesService, GreenHouseAPIClient>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                //This only handles exceptions (500)
                app.UseDeveloperExceptionPage();
                //Other status codes need to be handled with UseStatusCodePages. Otherwise you'll get a blank page
                app.UseStatusCodePages();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error/Status");
                app.UseStatusCodePagesWithReExecute("/error/status", "?statusCode={0}");
            }

            //EXAMPLE: setting cache headers for static files
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = context =>
                {
                    context.Context.Response.Headers["Cache-Control"] = "no-cache";

                    //context.Context.Response.Headers["Expires"] = DateTime.UtcNow.AddHours(12).ToString("R");
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}");
                
            });

            //if we are running behind IIS, we don't want IIS to handle the 404s
            app.Run(context =>
            {
                context.Response.StatusCode = 404;
                return Task.FromResult(0);
            });
        }
    }
}
