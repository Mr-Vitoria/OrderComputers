using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
            model.BestComputerAssemblies = await _context.ComputerAssemblies.Take(4).ToListAsync();;
            foreach (var item in await _context.ComputerAssemblies.Select(ca => ca.TypeComputerAssembly).Distinct().ToListAsync())
            {
                model.TypesComputerAssembly.Add(new Tuple<string, string, int>(item
                    , (await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly == item).FirstAsync()).ImgUrl
                    ,(int)await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly== item).MinAsync(ca => ca.CostPrice)));
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

        public async Task<IActionResult> ConfigurationPC()
        {
            ViewData["CompBodies"] = await _context.CompBodies.ToListAsync();
            ViewData["CompProcessors"] = await _context.CompProcessors.ToListAsync();
            ViewData["MotherCards"] = await _context.MotherCards.ToListAsync();
            ViewData["PowerSupplyUnits"] = await _context.PowerSupplyUnits.ToListAsync();
            ViewData["RAMMemories"] = await _context.RAMMemories.ToListAsync();
            ViewData["StorageDevices"] = await _context.StorageDevices.ToListAsync();
            ViewData["VideoCards"] = await _context.VideoCards.ToListAsync();

            ViewData["Monitors"] = await _context.Peripheries.Where(pr=>pr.Type == "Monitor").ToListAsync();
            ViewData["Speakers"] = await _context.Peripheries.Where(pr => pr.Type == "Speaker/Headphones").ToListAsync();
            ViewData["Mouses"] = await _context.Peripheries.Where(pr => pr.Type == "Mouse").ToListAsync();
            ViewData["Keyboards"] = await _context.Peripheries.Where(pr => pr.Type == "Keyboard").ToListAsync();
            return View(new ComputerAssembly());
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
