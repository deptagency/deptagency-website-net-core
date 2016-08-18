using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using D.Models.Website.Interfaces;
using D.Models.Vacancies;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace D.Website.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    [Route("api/[controller]")]
    public class JobsController
    {
        //EXAMPLE: dependency injection at MVC action level
        [HttpGet]
        public async Task<JobsResponse> Get([FromServices] IVacanciesService vacanciesService)
        {
            return await vacanciesService.GetJobs();
        }
       
    }
}
