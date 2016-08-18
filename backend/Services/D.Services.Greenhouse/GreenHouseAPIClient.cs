using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using D.Models.Vacancies;
using D.Models.Website.Configuration;
using D.Models.Website.Interfaces;
using Newtonsoft.Json;

namespace D.Services.Greenhouse
{
    public class GreenHouseAPIClient : IVacanciesService
    {
        private VacanciesServiceConfiguration serviceSettings { get; set; }
        public GreenHouseAPIClient(IOptions<VacanciesServiceConfiguration> settings)
        {
            this.serviceSettings = settings.Value;
        }

        public async Task<JobsResponse> GetJobs()
        {
            var httpClient = new HttpClient();

            using (httpClient)
            {
                httpClient.BaseAddress = new Uri(this.serviceSettings.APIBaseUrl);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                HttpResponseMessage response = await httpClient.GetAsync(this.serviceSettings.VacanciesPath);
                var message = response.Content.ReadAsStringAsync().Result;
                try
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var jobs = await response.Content.ReadAsStringAsync()
                            .ContinueWith<JobsResponse>(postTask =>
                            {
                                return JsonConvert.DeserializeObject<JobsResponse>(postTask.Result);
                            });
                        return jobs;
                    }
                }
                catch (Exception e)
                {
                    throw new Exception(message, e);
                }
            }
            return null;
        }
    }
}
