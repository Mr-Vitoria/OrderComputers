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
    public class MotherCardsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MotherCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: MotherCards
        public async Task<IActionResult> Index()
        {
              return _context.MotherCards != null ? 
                          View(await _context.MotherCards.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.MotherCards'  is null.");
        }

        // GET: MotherCards/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.MotherCards == null)
            {
                return NotFound();
            }

            var motherCard = await _context.MotherCards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (motherCard == null)
            {
                return NotFound();
            }

            return View(motherCard);
        }

        // GET: MotherCards/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MotherCards/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Size,Socket,HaveWiFiModul,HaveBluetoothModul,Price")] MotherCard motherCard)
        {
            if (ModelState.IsValid)
            {
                _context.Add(motherCard);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(motherCard);
        }

        // GET: MotherCards/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.MotherCards == null)
            {
                return NotFound();
            }

            var motherCard = await _context.MotherCards.FindAsync(id);
            if (motherCard == null)
            {
                return NotFound();
            }
            return View(motherCard);
        }

        // POST: MotherCards/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Size,Socket,HaveWiFiModul,HaveBluetoothModul,Price")] MotherCard motherCard)
        {
            if (id != motherCard.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(motherCard);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MotherCardExists(motherCard.Id))
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
            return View(motherCard);
        }

        // GET: MotherCards/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.MotherCards == null)
            {
                return NotFound();
            }

            var motherCard = await _context.MotherCards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (motherCard == null)
            {
                return NotFound();
            }

            return View(motherCard);
        }

        // POST: MotherCards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.MotherCards == null)
            {
                return Problem("Entity set 'ApplicationDbContext.MotherCards'  is null.");
            }
            var motherCard = await _context.MotherCards.FindAsync(id);
            if (motherCard != null)
            {
                _context.MotherCards.Remove(motherCard);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MotherCardExists(int id)
        {
          return (_context.MotherCards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
