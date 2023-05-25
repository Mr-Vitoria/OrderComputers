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
    public class PowerSupplyUnitsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PowerSupplyUnitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<PowerSupplyUnit>> Index()
        {
            return await _context.PowerSupplyUnits.ToListAsync();
        }

        [Route("detail")]
        public async Task<PowerSupplyUnit?> Details(int? id)
        {
            if (id == null || _context.PowerSupplyUnits == null)
            {
                return null;
            }

            var powerSupplyUnit = await _context.PowerSupplyUnits
                .FirstOrDefaultAsync(m => m.Id == id);

            return powerSupplyUnit;
        }

        [Route("create")]
        public async Task<string> Create(string name, string formFactor, int power,int price)
        {
            PowerSupplyUnit powerSupplyUnit = new PowerSupplyUnit { Name = name, Price = price, FormFactor = formFactor, Power = power};

            if (ModelState.IsValid)
            {
                _context.Add(powerSupplyUnit);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create powerSupplyUnit";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string formFactor, int power, int price)
        {
            PowerSupplyUnit powerSupplyUnit = new PowerSupplyUnit { Id=id, Name = name, Price = price, FormFactor = formFactor, Power = power };
            try
            {
                _context.Update(powerSupplyUnit);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PowerSupplyUnitExists(powerSupplyUnit.Id))
                {
                    return "Error update from edit powerSupplyUnit";
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
            if (_context.PowerSupplyUnits == null)
            {
                return "Error delete powerSupplyUnit: Entity is nnull";
            }
            var powerSupplyUnit = await _context.PowerSupplyUnits.FindAsync(id);
            if (powerSupplyUnit != null)
            {
                _context.PowerSupplyUnits.Remove(powerSupplyUnit);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool PowerSupplyUnitExists(int id)
        {
          return (_context.PowerSupplyUnits?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
