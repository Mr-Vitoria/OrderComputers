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
    public class RAMMemoriesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RAMMemoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<RAMMemory>> Index()
        {
            return await _context.RAMMemories.ToListAsync();
        }

        [Route("detail")]
        public async Task<RAMMemory?> Details(int? id)
        {
            if (id == null || _context.RAMMemories == null)
            {
                return null;
            }

            var ramMemory = await _context.RAMMemories
                .FirstOrDefaultAsync(m => m.Id == id);

            return ramMemory;
        }

        [Route("create")]
        public async Task<string> Create(string name, string type, int count, int frequency , int price)
        {
            RAMMemory ramMemory = new RAMMemory { Name = name, Price = price, Type = type, Count = count,Frequency = frequency };

            if (ModelState.IsValid)
            {
                _context.Add(ramMemory);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create RAMMemory";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string type, int count, int frequency, int price)
        {
            RAMMemory ramMemory = new RAMMemory { Id = id, Name = name, Price = price, Type = type, Count = count, Frequency = frequency };
            try
            {
                _context.Update(ramMemory);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RAMMemoryExists(ramMemory.Id))
                {
                    return "Error update from edit RAMMemory";
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
            if (_context.RAMMemories == null)
            {
                return "Error delete RAMMemory: Entity is nnull";
            }
            var ramMemory = await _context.RAMMemories.FindAsync(id);
            if (ramMemory != null)
            {
                _context.RAMMemories.Remove(ramMemory);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool RAMMemoryExists(int id)
        {
          return (_context.RAMMemories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
