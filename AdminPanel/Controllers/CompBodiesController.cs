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
    public class CompBodiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompBodiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: CompBodies
        public async Task<IActionResult> Index()
        {
              return _context.CompBodies != null ? 
                          View(await _context.CompBodies.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.CompBodies'  is null.");
        }

        // GET: CompBodies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.CompBodies == null)
            {
                return NotFound();
            }

            var compBody = await _context.CompBodies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (compBody == null)
            {
                return NotFound();
            }

            return View(compBody);
        }

        // GET: CompBodies/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CompBodies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,FormFactor,Price")] CompBody compBody)
        {
            if (ModelState.IsValid)
            {
                _context.Add(compBody);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(compBody);
        }

        // GET: CompBodies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.CompBodies == null)
            {
                return NotFound();
            }

            var compBody = await _context.CompBodies.FindAsync(id);
            if (compBody == null)
            {
                return NotFound();
            }
            return View(compBody);
        }

        // POST: CompBodies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,FormFactor,Price")] CompBody compBody)
        {
            if (id != compBody.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(compBody);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompBodyExists(compBody.Id))
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
            return View(compBody);
        }

        // GET: CompBodies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.CompBodies == null)
            {
                return NotFound();
            }

            var compBody = await _context.CompBodies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (compBody == null)
            {
                return NotFound();
            }

            return View(compBody);
        }

        // POST: CompBodies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.CompBodies == null)
            {
                return Problem("Entity set 'ApplicationDbContext.CompBodies'  is null.");
            }
            var compBody = await _context.CompBodies.FindAsync(id);
            if (compBody != null)
            {
                _context.CompBodies.Remove(compBody);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CompBodyExists(int id)
        {
          return (_context.CompBodies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
