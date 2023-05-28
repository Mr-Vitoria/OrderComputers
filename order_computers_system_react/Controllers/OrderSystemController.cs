using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using System.Threading;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderSystemController : Controller
    {
        private readonly ILogger<OrderSystemController> _logger;
        private readonly ApplicationDbContext _context;

        public OrderSystemController(ILogger<OrderSystemController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("getindexmodel")]
        public async Task<object> Index()
        {
            var model= new {
                BestComputerAssemblies = new List<ComputerAssembly>(),
                TypesComputerAssembly = new List<Tuple<string,string,int>>()

            };
            model.BestComputerAssemblies.AddRange(await _context.ComputerAssemblies.Take(4).ToListAsync());
            foreach (var item in await _context.ComputerAssemblies.Select(ca => ca.TypeComputerAssembly).Distinct().ToListAsync())
            {
                model.TypesComputerAssembly.Add(new Tuple<string, string, int>(item
                    , (await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly == item).FirstAsync()).ImgUrl
                    ,(int)await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly== item).MinAsync(ca => ca.CostPrice)));
            }

            return model;
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

        [HttpGet]
        [Route("getconfigurationmodel")]
        public async Task<object> ConfigurationPC()
        {
            return new
            {
                CompBodies = await _context.CompBodies.ToListAsync(),
                CompProcessors = await _context.CompProcessors.ToListAsync(),
                MotherCards = await _context.MotherCards.ToListAsync(),
                PowerSupplyUnits = await _context.PowerSupplyUnits.ToListAsync(),
                RAMMemories = await _context.RAMMemories.ToListAsync(),
                StorageDevices = await _context.StorageDevices.ToListAsync(),
                VideoCards = await _context.VideoCards.ToListAsync(),

                Monitors = await _context.Peripheries.Where(pr => pr.Type == "Monitor").ToListAsync(),
                Speakers = await _context.Peripheries.Where(pr => pr.Type == "Speaker/Headphones").ToListAsync(),
                Mouses = await _context.Peripheries.Where(pr => pr.Type == "Mouse").ToListAsync(),
                Keyboards = await _context.Peripheries.Where(pr => pr.Type == "Keyboard").ToListAsync()
            };
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
