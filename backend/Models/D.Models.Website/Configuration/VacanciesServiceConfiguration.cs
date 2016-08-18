using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D.Models.Website.Configuration
{
    public class VacanciesServiceConfiguration
    {
        public string APIBaseUrl { get; set; } = "https://api.greenhouse.io";
        public string VacanciesPath { get; set; } = "/v1/boards/dept/embed/jobs";
    }
}
