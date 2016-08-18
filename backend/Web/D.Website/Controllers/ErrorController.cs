using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace D.Website.Controllers
{
    public class ErrorController : Controller
    {
        public ErrorController(ILogger logger)
        {
            _logger = logger;
        }

        private ILogger _logger;

        // Named Logger alternative
        //public ErrorController(ILoggerFactory loggerFactory)
        //{
        //    _logger = loggerFactory.CreateLogger("HomeController");
        //}

        // GET: /<controller>/
        public IActionResult Status(int statusCode)
        {
            _logger.LogError("error");
            ViewData["status"] = statusCode > 0 ? statusCode : HttpContext.Response.StatusCode;
            return View("Error");
        }
    }
}
