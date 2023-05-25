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
    public class MotherCardsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MotherCardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<MotherCard>> Index()
        {
            return await _context.MotherCards.ToListAsync();
        }

        [Route("detail")]
        public async Task<MotherCard?> Details(int? id)
        {
            if (id == null || _context.MotherCards == null)
            {
                return null;
            }

            var motherCard = await _context.MotherCards
                .FirstOrDefaultAsync(m => m.Id == id);

            return motherCard;
        }

        [Route("create")]
        public async Task<string> Create(string name, int price, string size,string socket, bool haveWiFiModel, bool haveBluetoothModel)
        {
            MotherCard motherCard = new MotherCard { Name = name, Price = price, Size = size,  HaveWiFiModul=haveWiFiModel, HaveBluetoothModul= haveBluetoothModel,Socket=socket};
            
            if (ModelState.IsValid)
            {
                _context.Add(motherCard);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create motherCard";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, int price, string size, string socket, bool haveWiFiModel, bool haveBluetoothModel)
        {
            MotherCard motherCard = new MotherCard { Id = id, Name = name, Price = price, Size = size, HaveWiFiModul = haveWiFiModel, HaveBluetoothModul = haveBluetoothModel, Socket = socket };
            try
            {
                _context.Update(motherCard);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MotherCardExists(motherCard.Id))
                {
                    return "Error update from edit motherCard";
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
            if (_context.MotherCards == null)
            {
                return "Error delete motherCard: Entity is nnull";
            }
            var motherCard = await _context.MotherCards.FindAsync(id);
            if (motherCard != null)
            {
                _context.MotherCards.Remove(motherCard);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool MotherCardExists(int id)
        {
          return (_context.MotherCards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
