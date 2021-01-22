using FileContextCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using googleBooks_backend.Data;
using Microsoft.Extensions.Configuration;

namespace googleBooks_backend
{
  public class Startup
  { 
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();
      services.AddMvc(options => options.EnableEndpointRouting = false);
      services.AddScoped<StoreDataContext, StoreDataContext>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors(option => option.AllowAnyOrigin());;
      app.UseMvc();
    }
  }
}
