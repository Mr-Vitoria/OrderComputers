using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using order_computers_system_react.Services;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }


        [HttpGet]
        [Route("getuser")]
        public async Task<User?> UserDetails(string phone)
        {
            return await _userService.getUserByPhone(phone);
        }

        [HttpGet]
        [Route("getuserbyid")]
        public async Task<User?> UserDetailsById(int id)
        {
            return await _userService.getUserById(id);
        }

        [HttpGet]
        [Route("changeuserinfo")]
        public async Task<object> ChangeUserInfo(int id, string imgUrl)
        {
            return _userService.changeUserInfo(id,imgUrl);
        }

        [HttpGet]
        [Route("createuser")]
        public async Task<object> Registration(string phone, string login, string name, string password)
        {
            return await _userService.createUser(phone, login, name, password);
        }

        [HttpGet]
        [Route("gethistoryuser")]
        public async Task<object> UserOrders(int id)
        {
            return _userService.getUserOrders(id);
        }
    }
}
