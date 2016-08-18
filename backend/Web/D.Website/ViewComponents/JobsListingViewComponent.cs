using D.Models.Website.Interfaces;
using Microsoft.AspNetCore.Mvc;
using D.Models.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.Website.ViewComponents
{
    public class JobsListingViewComponent : ViewComponent
    {
        private readonly IVacanciesService _vacanciesService;
        public JobsListingViewComponent(IVacanciesService vacanciesService)
        {
            _vacanciesService = vacanciesService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            JobsResponse jobsResponse = await _vacanciesService.GetJobs();
            return View(jobsResponse);
        }
    }
}
