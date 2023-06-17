using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using order_computers_system_react.Services;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssemblyListController : Controller
    {
        private readonly ILogger<AssemblyListController> _logger;
        private readonly IAssemblyListService _assemblyListService;

        public AssemblyListController(ILogger<AssemblyListController> logger, IAssemblyListService assemblyListService)
        {
            _logger = logger;
            _assemblyListService = assemblyListService;
        }

        [HttpGet]
        [Route("getassemblylist")]
        public async Task<object> GetAssemblyList()
        {
            return await _assemblyListService.getAssemblyList();
        }

        [HttpGet]
        [Route("getsortoption")]
        public async Task<object> GetSortOption()
        {
            return await _assemblyListService.getSortOption();
        }
    }
}
