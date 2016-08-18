using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace D.Models.Vacancies
{
    public class Job
    {
        public int Id { get; set; }
        [JsonProperty("internal_job_id")]
        public int InternalJobId { get; set; }
        public string Title { get; set; }
        [JsonProperty("updated_at")]
        public DateTime UpdatedAt { get; set; }
        public Location Location { get; set; }
        [JsonProperty("absolute_url")]
        public string AbsoluteUrl { get; set; }
        public List<Metadata> Metadata { get; set; }
    }
}
