using System.Collections.Generic;

namespace D.Models.Vacancies
{
    public class JobsResponse
    {
        public List<Job> Jobs { get; set; }
        public Meta Meta { get; set; }
    }
}
