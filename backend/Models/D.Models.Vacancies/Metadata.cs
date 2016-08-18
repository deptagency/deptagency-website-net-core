using Newtonsoft.Json;

namespace D.Models.Vacancies
{
    public class Metadata
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        [JsonProperty("value_type")]
        public string ValueType { get; set; }
    }
}
