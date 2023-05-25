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
    public class VideoCardsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VideoCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<VideoCard>> Index()
        {
            return await _context.VideoCards.ToListAsync();
        }

        [Route("detail")]
        public async Task<VideoCard?> Details(int? id)
        {
            if (id == null || _context.VideoCards == null)
            {
                return null;
            }

            var videoCard = await _context.VideoCards
                .FirstOrDefaultAsync(m => m.Id == id);

            return videoCard;
        }

        [Route("create")]
        public async Task<string> Create(string name, string producer, string family,string generation, string series, string type, int count,int price)
        {
            VideoCard videoCard = new VideoCard
            {
                Name = name,
                Producer = producer,
                Family = family,
                Generation = generation,
                Series = series,
                Type = type,
                Count = count,
                Price = price
            };

            if (ModelState.IsValid)
            {
                _context.Add(videoCard);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create VideoCard";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string producer, string family, string generation, string series, string type, int count, int price)
        {
            VideoCard videoCard = new VideoCard
            {
                Id = id,
                Name = name,
                Producer = producer,
                Family = family,
                Generation = generation,
                Series = series,
                Type = type,
                Count = count,
                Price = price
            };
            try
            {
                _context.Update(videoCard);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoCardExists(videoCard.Id))
                {
                    return "Error update from edit VideoCard";
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
            if (_context.VideoCards == null)
            {
                return "Error delete VideoCard: Entity is nnull";
            }
            var videoCard = await _context.VideoCards.FindAsync(id);
            if (videoCard != null)
            {
                _context.VideoCards.Remove(videoCard);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool VideoCardExists(int id)
        {
          return (_context.VideoCards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
