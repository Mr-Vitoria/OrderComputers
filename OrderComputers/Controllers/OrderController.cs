using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderComputers.Models;

namespace OrderComputers.Controllers
{
    public class OrderController : Controller
    {
        private readonly ILogger<OrderController> _logger;
        private readonly ApplicationDbContext _context;

        public OrderController(ILogger<OrderController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            IndexViewModel model = new IndexViewModel();
            model.bestComputerAssemblies = await _context.ComputerAssemblies.Take(4).ToListAsync();
            foreach (var item in _context.ComputerAssemblies.Select(ca => ca.typeComputerAssembly).Distinct())
            {
                model.typesComputerAssembly.Add(new Tuple<string,int>(item,
                    (int)await _context.ComputerAssemblies.Where(ca=>ca.typeComputerAssembly==item).MinAsync(ca=>ca.CostPrice)));
            }
            
            return View(model);
        }

        public IActionResult Profile()
        {
            return View();
        }

        [HttpGet]
        [ActionName("Login")]
        public IActionResult LoginPage()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login()
        {
            return View();
        }


        [HttpGet]
        [ActionName("Registration")]
        public IActionResult RegistrationPage()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Registration()
        {
            return View();
        }

        public IActionResult Orders()
        {
            return View();
        }

        public IActionResult AssemblyList()
        {
            return View();
        }

        public IActionResult ConfigurationPc()
        {
            return View();
        }

        public IActionResult CheckOut()
        {
            return View();
        }

        public IActionResult ExecutorsList()
        {
            return View();
        }

        public IActionResult Executor()
        {
            return View();
        }
    }
}
