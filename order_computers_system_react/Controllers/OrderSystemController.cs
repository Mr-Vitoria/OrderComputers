using Microsoft.AspNetCore.Mvc;
using order_computers_system_react.Services;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderSystemController : Controller
    {
        private readonly ILogger<OrderSystemController> _logger;
        private readonly IOrderSystemService _orderSystemService;

        public OrderSystemController(ILogger<OrderSystemController> logger, IOrderSystemService orderSystemService)
        {
            _logger = logger;
            _orderSystemService = orderSystemService;
        }

        [HttpGet]
        [Route("getindexmodel")]
        public async Task<object> Index()
        {
            return await _orderSystemService.getIndexModel();
        }

        [HttpGet]
        [Route("getconfigurationmodel")]
        public async Task<object> ConfigurationPC()
        {
            return await _orderSystemService.getConfigurationModel();
        }

        [HttpGet]
        [Route("addFeedback")]
        public async Task<object> AddFeedback(int userId,string text, string date)
        {
            return await _orderSystemService.addFeedback(userId,text,date);
        }

    }
}
