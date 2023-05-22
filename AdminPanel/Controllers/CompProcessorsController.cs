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
    public class CompProcessorsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompProcessorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CompProcessors
        public async Task<IActionResult> Index()
        {
              return _context.CompProcessors != null ? 
                          View(await _context.CompProcessors.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.CompProcessors'  is null.");
        }

        // GET: CompProcessors/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.CompProcessors == null)
            {
                return NotFound();
            }

            var compProcessor = await _context.CompProcessors
                .FirstOrDefaultAsync(m => m.Id == id);
            if (compProcessor == null)
            {
                return NotFound();
            }

            return View(compProcessor);
        }

        // GET: CompProcessors/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CompProcessors/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Producer,Socket,CountCores,CountThreads,Frequency,TurboTechnology,TypeRam,HaveVideoCard,Price")] CompProcessor compProcessor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(compProcessor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(compProcessor);
        }

        // GET: CompProcessors/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.CompProcessors == null)
            {
                return NotFound();
            }

            var compProcessor = await _context.CompProcessors.FindAsync(id);
            if (compProcessor == null)
            {
                return NotFound();
            }
            return View(compProcessor);
        }

        // POST: CompProcessors/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Producer,Socket,CountCores,CountThreads,Frequency,TurboTechnology,TypeRam,HaveVideoCard,Price")] CompProcessor compProcessor)
        {
            if (id != compProcessor.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(compProcessor);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompProcessorExists(compProcessor.Id))
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
            return View(compProcessor);
        }

        // GET: CompProcessors/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.CompProcessors == null)
            {
                return NotFound();
            }

            var compProcessor = await _context.CompProcessors
                .FirstOrDefaultAsync(m => m.Id == id);
            if (compProcessor == null)
            {
                return NotFound();
            }

            return View(compProcessor);
        }

        // POST: CompProcessors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.CompProcessors == null)
            {
                return Problem("Entity set 'ApplicationDbContext.CompProcessors'  is null.");
            }
            var compProcessor = await _context.CompProcessors.FindAsync(id);
            if (compProcessor != null)
            {
                _context.CompProcessors.Remove(compProcessor);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CompProcessorExists(int id)
        {
          return (_context.CompProcessors?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
