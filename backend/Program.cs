using MappingStudio.Api.Pipelines.FileMapping;
using MappingStudio.Api.Options;
using MappingStudio.Api.Repositories;
using MappingStudio.Api.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddOptions<MongoDbOptions>()
    .Bind(builder.Configuration.GetSection(MongoDbOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services
    .AddOptions<OllamaOptions>()
    .Bind(builder.Configuration.GetSection(OllamaOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services
    .AddOptions<FilePipelineOptions>()
    .Bind(builder.Configuration.GetSection(FilePipelineOptions.SectionName))
    .Validate(
        options => !string.IsNullOrWhiteSpace(options.InputFilePath),
        "FilePipeline:InputFilePath is required.")
     .Validate(
         options => !string.IsNullOrWhiteSpace(options.OutputFilePath),
         "FilePipeline:OutputFilePath is required.")
      .ValidateOnStart();
       
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<MongoDbOptions>>().Value;
    return new MongoClient(options.ConnectionString);
});

builder.Services.AddScoped<IMongoDatabase>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<MongoDbOptions>>().Value;
    var client = serviceProvider.GetRequiredService<IMongoClient>();
    return client.GetDatabase(options.DatabaseName);
});

builder.Services.AddScoped<IMappingRepository, MappingRepository>();
builder.Services.AddScoped<IMappingService, MappingService>();
builder.Services.AddScoped<IMappingOutputRepository, MappingOutputRepository>();
builder.Services.AddScoped<IMappingOutputService, MappingOutputService>();
builder.Services.AddScoped<IGetterAdapter, FileGetterAdapter>();
builder.Services.AddScoped<IRawDataConverter, RawDataJsonConverter>();
builder.Services.AddScoped<IInputValidator, JsonInputValidator>();
builder.Services.AddScoped<ISenderAdapter, FileSenderAdapter>();
builder.Services.AddScoped<IFileMappingPipeline, FileMappingPipeline>();

builder.Services.AddHttpClient<IOllamaMappingSuggestionService, OllamaMappingSuggestionService>((serviceProvider, httpClient) =>
{
    var options = serviceProvider.GetRequiredService<IOptions<OllamaOptions>>().Value;
    httpClient.BaseAddress = new Uri(options.BaseUrl);
});

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        if (allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();

            return;
        }

        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.MapControllers();

app.Run();
