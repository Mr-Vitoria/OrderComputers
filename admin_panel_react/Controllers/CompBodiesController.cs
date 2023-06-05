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
    public class CompBodiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompBodiesController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<List<CompBody>> Index()
        {
              return await _context.CompBodies.ToListAsync();
        }



        [Route("detail")]
        public async Task<CompBody?> Details(int? id)
        {
            if (id == null || _context.CompBodies == null)
            {
                return null;
            }

            var compBody = await _context.CompBodies
                .FirstOrDefaultAsync(m => m.Id == id);

            return compBody;
        }


        [Route("create")]
        public async Task<string> Create(string name,int price,string formFactor,string imgUrl="")
        {
            CompBody compBody = new CompBody { Name = name,
                Price = price, 
                FormFactor = formFactor,
                ImgUrl = imgUrl};
            if (ModelState.IsValid)
            {
                _context.Add(compBody);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create compBody";
        }
        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, int price, string formFactor, string imgUrl = "")
        {
            CompBody compBody = new CompBody { 
                Id= id,
                Name = name,
                Price = price, 
                FormFactor = formFactor,
                ImgUrl = imgUrl};
            try
            {
                _context.Update(compBody);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompBodyExists(compBody.Id))
                {
                    return "Error update from edit compBody";
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
            if (_context.CompBodies == null)
            {
                return "Error delete compBody: Entity is nnull";
            }
            var compBody = await _context.CompBodies.FindAsync(id);
            if (compBody != null)
            {
                _context.CompBodies.Remove(compBody);
            }
            
            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool CompBodyExists(int id)
        {
          return (_context.CompBodies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
