using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using admin_panel_react.Models;

namespace admin_panel_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<User>> Index()
        {
            return await _context.Users.ToListAsync();
        }



        [Route("detail")]
        public async Task<User?> Details(int? id)
        {
            if (id == null || _context.Users == null)
            {
                return null;
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Id == id);

            return user;
        }

        [Route("getuser")]
        public async Task<User?> Details(string phone)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Phone == phone);

            return user;
        }


        [Route("create")]
        public async Task<string> Create(string name, string surname, string email, string phone, string password, string imgUrl, string typeUser="Common")
        {
            User user = new User { Name = name, Surname = surname, Email = email, Phone = phone, Password = password, TypeUser = typeUser, ImgUrl=imgUrl };

            if (ModelState.IsValid)
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create user";
        }
        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string surname, string email, string phone, string password, string imgUrl, string typeUser = "Common")
        {

            User user = new User { Id=id, Name = name, Surname = surname, Email = email, Phone = phone, Password = password, TypeUser = typeUser,ImgUrl=imgUrl }; 
            try
            {
                _context.Update(user);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                {
                    return "Error update from edit user";
                }
                else
                {
                    throw;
                }
            }
            return "Ok";
        }
        [Route("delete")]
        public async Task<string> Delete(int id)
        {
            if (_context.Users == null)
            {
                return "Error delete user: Entity is nnull";
            }
            var motherCard = await _context.Users.FindAsync(id);
            if (motherCard != null)
            {
                _context.Users.Remove(motherCard);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool UserExists(int id)
        {
          return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
