using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JsonFlatFileDataStore;
using MedicineAPI.Domain;
using MedicineAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace MedicineAPI
{
    public class Startup
    {
        private readonly string AllowSpecificOrigins = "AllowOriginPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var dataStore = new DataStore(Configuration.GetConnectionString("Database"));
            if (dataStore.GetCollection<Medicine>("medicines").Count == 0)
            {
                dataStore.GetCollection<Medicine>("medicines").InsertMany(GenerateMedicines);
            }

            services.AddCors(options => {
                options.AddPolicy(
                    AllowSpecificOrigins,
                    builder => {
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyHeader()
                               .WithMethods("GET", "POST", "PATCH");
                    }
                );
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ddd", Version = "v1" });
            });
            services.AddTransient<IMedicineService, MedicineService>();
            services.AddSingleton<DataStore>(dataStore);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ddd v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private IEnumerable<Medicine> GenerateMedicines
        {
            get
            {
                List<Medicine> medicines = new List<Medicine>()
                {
                    new Medicine { Name="Benadryl Syrup", Brand="Benadryl Syrup", Price=45.00m, Quantity=15, ExpiryDate=new DateTime(year: 2022, month: 8, day: 12), Notes="Used to treat cough"},
                    new Medicine { Name="Limcee", Brand="Abbott Health Care Pvt Ltd", Price=95.00m, Quantity=15, ExpiryDate=new DateTime(year: 2021, month: 11, day: 6), Notes="Limcee vitamin C 500mg"},
                    new Medicine { Name="Zerodol-P", Brand="Ipca Laboratories Pvt Ltd", Price=100.00m, Quantity=9, ExpiryDate=new DateTime(year: 2021, month: 12, day: 6), Notes=""},
                    new Medicine { Name="Azithromicin", Brand="Cipla", Price=130.50m, Quantity=40, ExpiryDate=new DateTime(year: 2022, month: 1, day: 23), Notes="Treats bacterial infection"},
                    new Medicine { Name="Arshomrit", Brand="Ajit Ayuvedia", Price=150.00m, Quantity=10, ExpiryDate=new DateTime(year: 2022, month: 8, day: 2), Notes=""},
                    new Medicine { Name="Duphalac soln", Brand="Solvay", Price=95.00m, Quantity=40, ExpiryDate=new DateTime(year: 2021, month: 5, day: 30), Notes="Ease in motion"}
                };
                return medicines;
            }
        }
    }
}
