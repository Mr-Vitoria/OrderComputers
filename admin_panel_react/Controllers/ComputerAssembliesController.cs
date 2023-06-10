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
    public class ComputerAssembliesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ComputerAssembliesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<ComputerAssembly>> Index()
        {
            await _context.CompBodies.LoadAsync();
            await _context.CompProcessors.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();
            await _context.VideoCards.LoadAsync();


            return await _context.ComputerAssemblies.ToListAsync();
        }

        [Route("detail")]
        public async Task<ComputerAssembly?> Details(int? id)
        {
            if (id == null || _context.ComputerAssemblies == null)
            {
                return null;
            }

            await _context.CompBodies.LoadAsync();
            await _context.CompProcessors.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();
            await _context.VideoCards.LoadAsync();

            return await _context.ComputerAssemblies
                                            .FirstOrDefaultAsync(m => m.Id == id);
        }

        [Route("getselectlists")]
        public object GetSelectLists()
        {
            var model = new
            {
                CompBodies = new SelectList(_context.CompBodies, "Id", "Name"),
                CompProcessors = new SelectList(_context.CompProcessors, "Id", "Name"),
                MotherCards = new SelectList(_context.MotherCards, "Id", "Name"),
                PowerSupplyUnits = new SelectList(_context.PowerSupplyUnits, "Id", "Name"),
                RAMMemories = new SelectList(_context.RAMMemories, "Id", "Name"),
                StorageDevices = new SelectList(_context.StorageDevices, "Id", "Name"),
                VideoCards = new SelectList(_context.VideoCards, "Id", "Name")
            };
            return model;
        }

        [Route("create")]
        public async Task<string> Create(int compBodyId, int motherCardId, 
            int powerSupplyUnitId, int compProcessorId, 
            int ramMemoryId, int storageDeviceId, 
            int videoCardId, int costPrice, 
            string type, string name,
            string imgUrl = "")
        {
            ComputerAssembly computerAssembly = new ComputerAssembly()
            {
                Name = name,
                CompBodyId = compBodyId,
                MotherCardId = motherCardId,
                PowerSupplyUnitId = powerSupplyUnitId,
                CompProcessorId = compProcessorId,
                RAMMemoryId = ramMemoryId,
                StorageDeviceId = storageDeviceId,
                VideoCardId = (videoCardId==-1?null:videoCardId),
                CostPrice = costPrice,
                TypeComputerAssembly = type,
                ImgUrl = imgUrl
            };
            if (ModelState.IsValid)
            {
                _context.Add(computerAssembly);
                await _context.SaveChangesAsync();
                return "Ok";
            }

            return "Error for create computer assembly";
        }


        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, int compBodyId, 
            int motherCardId, int powerSupplyUnitId, 
            int compProcessorId, int ramMemoryId, 
            int storageDeviceId, int videoCardId,
            int costPrice, string type, 
            string name, string imgUrl = "")
        {
            ComputerAssembly computerAssembly = new ComputerAssembly()
            {
                Id = id,
                Name = name,
                CompBodyId = compBodyId,
                MotherCardId = motherCardId,
                PowerSupplyUnitId = powerSupplyUnitId,
                CompProcessorId = compProcessorId,
                RAMMemoryId = ramMemoryId,
                StorageDeviceId = storageDeviceId,
                VideoCardId = (videoCardId == -1 ? null : videoCardId),
                CostPrice = costPrice,
                TypeComputerAssembly = type,
                ImgUrl = imgUrl
            };

            try
            {
                _context.Update(computerAssembly);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComputerAssemblyExists(computerAssembly.Id))
                {
                    return "Error update computer assembly";
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
            if (_context.ComputerAssemblies == null)
            {
                return "Entity set 'ApplicationDbContext.ComputerAssemblies'  is null.";
            }
            var computerAssembly = await _context.ComputerAssemblies.FindAsync(id);

            if (computerAssembly != null)
            {
                _context.Orders.RemoveRange(_context.Orders.Where(or => or.ComputerAssemblyId == computerAssembly.Id));

                _context.ComputerAssemblies.Remove(computerAssembly);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool ComputerAssemblyExists(int id)
        {
            return (_context.ComputerAssemblies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
