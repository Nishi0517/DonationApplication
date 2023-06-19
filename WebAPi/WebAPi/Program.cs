using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebAPi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddDbContext<DonationDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DonationDBContext"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=DCandidate}/{action=GetDCandidates}/{id?}");

app.UseAuthorization();

app.MapRazorPages();

app.Run();
