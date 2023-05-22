using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrderComputers.Areas.Executor.Controllers
{
    public class ExecutorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Orders()
        {
            return View();
        }
    }
}
