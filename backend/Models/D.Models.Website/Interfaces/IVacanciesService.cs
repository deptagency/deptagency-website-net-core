using D.Models.Vacancies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace D.Models.Website.Interfaces
{
    public interface IVacanciesService
    {
        Task<JobsResponse> GetJobs();
    }
}
