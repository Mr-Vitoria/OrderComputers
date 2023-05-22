using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AdminPanel.Models;

namespace AdminPanel.Controllers
{
    public class RAMMemoriesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RAMMemoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: RAMMemories
        public async Task<IActionResult> Index()
        {
              return _context.RAMMemories != null ? 
                          View(await _context.RAMMemories.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.RAMMemories'  is null.");
        }

        // GET: RAMMemories/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.RAMMemories == null)
            {
                return NotFound();
            }

            var rAMMemory = await _context.RAMMemories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rAMMemory == null)
            {
                return NotFound();
            }

            return View(rAMMemory);
        }

        // GET: RAMMemories/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: RAMMemories/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Type,Count,Frequency,Price")] RAMMemory rAMMemory)
        {
            if (ModelState.IsValid)
            {
                _context.Add(rAMMemory);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(rAMMemory);
        }

        // GET: RAMMemories/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.RAMMemories == null)
            {
                return NotFound();
            }

            var rAMMemory = await _context.RAMMemories.FindAsync(id);
            if (rAMMemory == null)
            {
                return NotFound();
            }
            return View(rAMMemory);
        }

        // POST: RAMMemories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Type,Count,Frequency,Price")] RAMMemory rAMMemory)
        {
            if (id != rAMMemory.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(rAMMemory);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RAMMemoryExists(rAMMemory.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(rAMMemory);
        }

        // GET: RAMMemories/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.RAMMemories == null)
            {
                return NotFound();
            }

            var rAMMemory = await _context.RAMMemories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rAMMemory == null)
            {
                return NotFound();
            }

            return View(rAMMemory);
        }

        // POST: RAMMemories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.RAMMemories == null)
            {
                return Problem("Entity set 'ApplicationDbContext.RAMMemories'  is null.");
            }
            var rAMMemory = await _context.RAMMemories.FindAsync(id);
            if (rAMMemory != null)
            {
                _context.RAMMemories.Remove(rAMMemory);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RAMMemoryExists(int id)
        {
          return (_context.RAMMemories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
