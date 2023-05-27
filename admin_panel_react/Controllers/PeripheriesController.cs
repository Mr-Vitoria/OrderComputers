using admin_panel_react.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace admin_panel_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PeripheriesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PeripheriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Periphery>> Index()
        {
            var peripheries = _context.Peripheries;
            return await peripheries.ToListAsync();
        }

        [Route("detail")]
        public async Task<Periphery?> Details(int? id)
        {
            if (id == null || _context.Peripheries == null)
            {
                return null;
            }

            var periphery = await _context.Peripheries
                .FirstOrDefaultAsync(m => m.Id == id);

            return periphery;
        }

        [Route("create")]
        public async Task<string> Create(string name, string type, int price)
        {
            Periphery order = new Periphery()
            {
                Name = name,
                Type = type,
                Price = price
            };
            if (ModelState.IsValid)
            {
                _context.Add(order);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error for create periphery";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string type,int price)
        {
            Periphery order = new Periphery()
            {
                Id = id,
                Name = name,
                Type = type,
                Price = price
            };


            try
            {
                _context.Update(order);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeripheriesExists(order.Id))
                {
                    return "Error update periphery";
                }
                else
                {
                    throw;
                }
            }
            return "Ok";
        }


        [Route("delete")]
        public async Task<string> DeleteConfirmed(int id)
        {
            if (_context.Peripheries == null)
            {
                return "Entity set 'ApplicationDbContext.Peripheries'  is null.";
            }
            var periphery = await _context.Peripheries.FindAsync(id);
            if (periphery != null)
            {
                _context.Peripheries.Remove(periphery);
            }

            await _context.SaveChangesAsync();
            return "OK";
        }

        private bool PeripheriesExists(int id)
        {
            return (_context.Peripheries?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
