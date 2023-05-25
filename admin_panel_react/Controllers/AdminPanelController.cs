using admin_panel_react.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;

namespace admin_panel_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminPanelController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminPanelController(ApplicationDbContext context) {
            this._context = context;
        }
        [HttpGet]
        public async Task<List<User>> Get()
        {
            Console.WriteLine("testttttt");
            return await _context.Users.ToListAsync();
        }
        [HttpGet]
        [Route("bodies")]
        public async Task<List<CompBody>> GetBodies()
        {
            Console.WriteLine("testttttt");
            return await _context.CompBodies.ToListAsync();
        }

        //[HttpGet]
        //[ActionName("Login")]
        //public IActionResult LoginPage()
        //{
        //    return View();
        //}

        //public async Task<IActionResult> Login(string email, string password) {
        //    User user = await _context.Users.FirstOrDefaultAsync(us=>us.Email==email&&us.Password==password);
        //    if(user!=null&&user.TypeUser=="Admin")
        //    {
        //        HttpContext.Response.Cookies.Append("UserId", user.Id.ToString());
        //        return RedirectToAction("Index");
        //    }
        //    return View();
        //}

        //public IActionResult SignOut(string email, string password)
        //{
        //    HttpContext.Response.Cookies.Delete("UserId");
        //    return RedirectToAction("Index","AdminPanel");
        //}
    }
}
