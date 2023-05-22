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
    public class VideoCardsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VideoCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: VideoCards
        public async Task<IActionResult> Index()
        {
              return _context.VideoCards != null ? 
                          View(await _context.VideoCards.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.VideoCards'  is null.");
        }

        // GET: VideoCards/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.VideoCards == null)
            {
                return NotFound();
            }

            var videoCard = await _context.VideoCards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (videoCard == null)
            {
                return NotFound();
            }

            return View(videoCard);
        }

        // GET: VideoCards/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: VideoCards/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Producer,Family,LetterIndex,Generation,Series,TypeMemory,CountMemory,Price")] VideoCard videoCard)
        {
            if (ModelState.IsValid)
            {
                _context.Add(videoCard);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(videoCard);
        }

        // GET: VideoCards/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.VideoCards == null)
            {
                return NotFound();
            }

            var videoCard = await _context.VideoCards.FindAsync(id);
            if (videoCard == null)
            {
                return NotFound();
            }
            return View(videoCard);
        }

        // POST: VideoCards/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Producer,Family,LetterIndex,Generation,Series,TypeMemory,CountMemory,Price")] VideoCard videoCard)
        {
            if (id != videoCard.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(videoCard);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VideoCardExists(videoCard.Id))
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
            return View(videoCard);
        }

        // GET: VideoCards/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.VideoCards == null)
            {
                return NotFound();
            }

            var videoCard = await _context.VideoCards
                .FirstOrDefaultAsync(m => m.Id == id);
            if (videoCard == null)
            {
                return NotFound();
            }

            return View(videoCard);
        }

        // POST: VideoCards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.VideoCards == null)
            {
                return Problem("Entity set 'ApplicationDbContext.VideoCards'  is null.");
            }
            var videoCard = await _context.VideoCards.FindAsync(id);
            if (videoCard != null)
            {
                _context.VideoCards.Remove(videoCard);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool VideoCardExists(int id)
        {
          return (_context.VideoCards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
