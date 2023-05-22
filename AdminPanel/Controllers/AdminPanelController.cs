using AdminPanel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;

namespace AdminPanel.Controllers
{
    public class AdminPanelController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdminPanelController(ApplicationDbContext context) {
            this._context = context;
        }
        public async Task<IActionResult> Index()
        {
            string? UserId = HttpContext.Request.Cookies["UserId"];
            if ( UserId == null)
            {
                return RedirectToAction("Login","AdminPanel");
            }
            User user = await _context.Users.FirstOrDefaultAsync(us=>us.Id==int.Parse(UserId));

            if(user==null || user.TypeUser!="Admin")
            {
                return RedirectToAction("Login", "AdminPanel");
            }

            return View();
        }

        [HttpGet]
        [ActionName("Login")]
        public IActionResult LoginPage()
        {
            return View();
        }

        public async Task<IActionResult> Login(string email, string password) {
            User user = await _context.Users.FirstOrDefaultAsync(us=>us.Email==email&&us.Password==password);
            if(user!=null&&user.TypeUser=="Admin")
            {
                HttpContext.Response.Cookies.Append("UserId", user.Id.ToString());
                return RedirectToAction("Index");
            }
            return View();
        }

        public IActionResult SignOut(string email, string password)
        {
            HttpContext.Response.Cookies.Delete("UserId");
            return RedirectToAction("Index","AdminPanel");
        }
    }
}
