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
    public class StorageDevicesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StorageDevicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<StorageDevice>> Index()
        {
            return await _context.StorageDevices.ToListAsync();
        }

        [Route("detail")]
        public async Task<StorageDevice?> Details(int? id)
        {
            if (id == null || _context.StorageDevices== null)
            {
                return null;
            }

            var storageDevice = await _context.StorageDevices
                .FirstOrDefaultAsync(m => m.Id == id);

            return storageDevice;
        }

        [Route("create")]
        public async Task<string> Create(string name, int count, string type, int price, string imgUrl = "")
        {
            StorageDevice storageDevice = new StorageDevice {
                Name = name,
                Price = price, 
                Type = type,
                Count = count,
                ImgUrl = imgUrl
            };

            if (ModelState.IsValid)
            {
                _context.Add(storageDevice);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create StorageDevice";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, int count, string type, int price, string imgUrl = "")
        {
            StorageDevice storageDevice = new StorageDevice {
                Id=id,
                Name = name,
                Price = price, 
                Type = type,
                Count = count,
                ImgUrl = imgUrl
                
            };
            try
            {
                _context.Update(storageDevice);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StorageDeviceExists(storageDevice.Id))
                {
                    return "Error update from edit StorageDevice";
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
            if (_context.StorageDevices == null)
            {
                return "Error delete StorageDevice: Entity is nnull";
            }
            var storageDevice = await _context.StorageDevices.FindAsync(id);
            if (storageDevice != null)
            {
                _context.StorageDevices.Remove(storageDevice);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }
        private bool StorageDeviceExists(int id)
        {
          return (_context.StorageDevices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
