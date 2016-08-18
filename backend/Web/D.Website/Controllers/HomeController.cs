using D.Models.Website.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace D.Website.Controllers
{
    [ResponseCache(CacheProfileName = "Default")]
    public class HomeController : Controller
    {
        private IVacanciesService _vacanciesService { get; set; }
        public HomeController(IVacanciesService vacanciesService)
        {
            _vacanciesService = vacanciesService;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
