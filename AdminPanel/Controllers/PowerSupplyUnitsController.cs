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
    public class PowerSupplyUnitsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PowerSupplyUnitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PowerSupplyUnits
        public async Task<IActionResult> Index()
        {
              return _context.PowerSupplyUnits != null ? 
                          View(await _context.PowerSupplyUnits.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.PowerSupplyUnits'  is null.");
        }

        // GET: PowerSupplyUnits/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PowerSupplyUnits == null)
            {
                return NotFound();
            }

            var powerSupplyUnit = await _context.PowerSupplyUnits
                .FirstOrDefaultAsync(m => m.Id == id);
            if (powerSupplyUnit == null)
            {
                return NotFound();
            }

            return View(powerSupplyUnit);
        }

        // GET: PowerSupplyUnits/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PowerSupplyUnits/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,FormFactor,Power,Price")] PowerSupplyUnit powerSupplyUnit)
        {
            if (ModelState.IsValid)
            {
                _context.Add(powerSupplyUnit);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(powerSupplyUnit);
        }

        // GET: PowerSupplyUnits/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.PowerSupplyUnits == null)
            {
                return NotFound();
            }

            var powerSupplyUnit = await _context.PowerSupplyUnits.FindAsync(id);
            if (powerSupplyUnit == null)
            {
                return NotFound();
            }
            return View(powerSupplyUnit);
        }

        // POST: PowerSupplyUnits/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,FormFactor,Power,Price")] PowerSupplyUnit powerSupplyUnit)
        {
            if (id != powerSupplyUnit.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(powerSupplyUnit);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PowerSupplyUnitExists(powerSupplyUnit.Id))
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
            return View(powerSupplyUnit);
        }

        // GET: PowerSupplyUnits/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.PowerSupplyUnits == null)
            {
                return NotFound();
            }

            var powerSupplyUnit = await _context.PowerSupplyUnits
                .FirstOrDefaultAsync(m => m.Id == id);
            if (powerSupplyUnit == null)
            {
                return NotFound();
            }

            return View(powerSupplyUnit);
        }

        // POST: PowerSupplyUnits/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.PowerSupplyUnits == null)
            {
                return Problem("Entity set 'ApplicationDbContext.PowerSupplyUnits'  is null.");
            }
            var powerSupplyUnit = await _context.PowerSupplyUnits.FindAsync(id);
            if (powerSupplyUnit != null)
            {
                _context.PowerSupplyUnits.Remove(powerSupplyUnit);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PowerSupplyUnitExists(int id)
        {
          return (_context.PowerSupplyUnits?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
