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
    public class ComputerAssembliesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ComputerAssembliesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ComputerAssemblies
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.ComputerAssemblies.Include(c => c.CompBody).Include(c => c.CompProcessor).Include(c => c.MotherCard).Include(c => c.Owner).Include(c => c.PowerSupplyUnit).Include(c => c.RAMMemory).Include(c => c.StorageDevice).Include(c => c.VideoCard);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: ComputerAssemblies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ComputerAssemblies == null)
            {
                return NotFound();
            }

            var computerAssembly = await _context.ComputerAssemblies
                .Include(c => c.CompBody)
                .Include(c => c.CompProcessor)
                .Include(c => c.MotherCard)
                .Include(c => c.Owner)
                .Include(c => c.PowerSupplyUnit)
                .Include(c => c.RAMMemory)
                .Include(c => c.StorageDevice)
                .Include(c => c.VideoCard)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (computerAssembly == null)
            {
                return NotFound();
            }

            return View(computerAssembly);
        }

        // GET: ComputerAssemblies/Create
        public IActionResult Create()
        {
            ViewData["CompBodyId"] = new SelectList(_context.CompBodies, "Id", "Id");
            ViewData["CompProcessorId"] = new SelectList(_context.CompProcessors, "Id", "Id");
            ViewData["MotherCardId"] = new SelectList(_context.MotherCards, "Id", "Id");
            ViewData["OwnerId"] = new SelectList(_context.Users, "Id", "Id");
            ViewData["PowerSupplyUnitId"] = new SelectList(_context.PowerSupplyUnits, "Id", "Id");
            ViewData["RAMMemoryId"] = new SelectList(_context.RAMMemories, "Id", "Id");
            ViewData["StorageDeviceId"] = new SelectList(_context.StorageDevices, "Id", "Id");
            ViewData["VideoCardId"] = new SelectList(_context.VideoCards, "Id", "Id");
            return View();
        }

        // POST: ComputerAssemblies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CompBodyId,MotherCardId,PowerSupplyUnitId,CompProcessorId,RAMMemoryId,StorageDeviceId,VideoCardId,OwnerId,CostPrice")] ComputerAssembly computerAssembly)
        {
            if (ModelState.IsValid)
            {
                _context.Add(computerAssembly);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompBodyId"] = new SelectList(_context.CompBodies, "Id", "Id", computerAssembly.CompBodyId);
            ViewData["CompProcessorId"] = new SelectList(_context.CompProcessors, "Id", "Id", computerAssembly.CompProcessorId);
            ViewData["MotherCardId"] = new SelectList(_context.MotherCards, "Id", "Id", computerAssembly.MotherCardId);
            ViewData["OwnerId"] = new SelectList(_context.Users, "Id", "Id", computerAssembly.OwnerId);
            ViewData["PowerSupplyUnitId"] = new SelectList(_context.PowerSupplyUnits, "Id", "Id", computerAssembly.PowerSupplyUnitId);
            ViewData["RAMMemoryId"] = new SelectList(_context.RAMMemories, "Id", "Id", computerAssembly.RAMMemoryId);
            ViewData["StorageDeviceId"] = new SelectList(_context.StorageDevices, "Id", "Id", computerAssembly.StorageDeviceId);
            ViewData["VideoCardId"] = new SelectList(_context.VideoCards, "Id", "Id", computerAssembly.VideoCardId);
            return View(computerAssembly);
        }

        // GET: ComputerAssemblies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ComputerAssemblies == null)
            {
                return NotFound();
            }

            var computerAssembly = await _context.ComputerAssemblies.FindAsync(id);
            if (computerAssembly == null)
            {
                return NotFound();
            }
            ViewData["CompBodyId"] = new SelectList(_context.CompBodies, "Id", "Id", computerAssembly.CompBodyId);
            ViewData["CompProcessorId"] = new SelectList(_context.CompProcessors, "Id", "Id", computerAssembly.CompProcessorId);
            ViewData["MotherCardId"] = new SelectList(_context.MotherCards, "Id", "Id", computerAssembly.MotherCardId);
            ViewData["OwnerId"] = new SelectList(_context.Users, "Id", "Id", computerAssembly.OwnerId);
            ViewData["PowerSupplyUnitId"] = new SelectList(_context.PowerSupplyUnits, "Id", "Id", computerAssembly.PowerSupplyUnitId);
            ViewData["RAMMemoryId"] = new SelectList(_context.RAMMemories, "Id", "Id", computerAssembly.RAMMemoryId);
            ViewData["StorageDeviceId"] = new SelectList(_context.StorageDevices, "Id", "Id", computerAssembly.StorageDeviceId);
            ViewData["VideoCardId"] = new SelectList(_context.VideoCards, "Id", "Id", computerAssembly.VideoCardId);
            return View(computerAssembly);
        }

        // POST: ComputerAssemblies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CompBodyId,MotherCardId,PowerSupplyUnitId,CompProcessorId,RAMMemoryId,StorageDeviceId,VideoCardId,OwnerId,CostPrice")] ComputerAssembly computerAssembly)
        {
            if (id != computerAssembly.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(computerAssembly);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ComputerAssemblyExists(computerAssembly.Id))
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
            ViewData["CompBodyId"] = new SelectList(_context.CompBodies, "Id", "Id", computerAssembly.CompBodyId);
            ViewData["CompProcessorId"] = new SelectList(_context.CompProcessors, "Id", "Id", computerAssembly.CompProcessorId);
            ViewData["MotherCardId"] = new SelectList(_context.MotherCards, "Id", "Id", computerAssembly.MotherCardId);
            ViewData["OwnerId"] = new SelectList(_context.Users, "Id", "Id", computerAssembly.OwnerId);
            ViewData["PowerSupplyUnitId"] = new SelectList(_context.PowerSupplyUnits, "Id", "Id", computerAssembly.PowerSupplyUnitId);
            ViewData["RAMMemoryId"] = new SelectList(_context.RAMMemories, "Id", "Id", computerAssembly.RAMMemoryId);
            ViewData["StorageDeviceId"] = new SelectList(_context.StorageDevices, "Id", "Id", computerAssembly.StorageDeviceId);
            ViewData["VideoCardId"] = new SelectList(_context.VideoCards, "Id", "Id", computerAssembly.VideoCardId);
            return View(computerAssembly);
        }

        // GET: ComputerAssemblies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ComputerAssemblies == null)
            {
                return NotFound();
            }

            var computerAssembly = await _context.ComputerAssemblies
                .Include(c => c.CompBody)
                .Include(c => c.CompProcessor)
                .Include(c => c.MotherCard)
                .Include(c => c.Owner)
                .Include(c => c.PowerSupplyUnit)
                .Include(c => c.RAMMemory)
                .Include(c => c.StorageDevice)
                .Include(c => c.VideoCard)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (computerAssembly == null)
            {
                return NotFound();
            }

            return View(computerAssembly);
        }

        // POST: ComputerAssemblies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ComputerAssemblies == null)
            {
                return Problem("Entity set 'ApplicationDbContext.ComputerAssemblies'  is null.");
            }
            var computerAssembly = await _context.ComputerAssemblies.FindAsync(id);
            if (computerAssembly != null)
            {
                _context.ComputerAssemblies.Remove(computerAssembly);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ComputerAssemblyExists(int id)
        {
          return (_context.ComputerAssemblies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
