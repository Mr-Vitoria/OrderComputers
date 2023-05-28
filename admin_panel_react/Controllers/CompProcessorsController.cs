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
    public class CompProcessorsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CompProcessorsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<List<CompProcessor>> Index()
        {
            return await _context.CompProcessors.ToListAsync();
        }



        [Route("detail")]
        public async Task<CompProcessor?> Details(int? id)
        {
            if (id == null || _context.CompProcessors == null)
            {
                return null;
            }

            var compProc = await _context.CompProcessors
                .FirstOrDefaultAsync(m => m.Id == id);

            return compProc;
        }


        //Id,Name,Producer,Socket,CountCores,CountThreads,Frequency,TurboTechnology,TypeRam,HaveVideoCard,Price
        [Route("create")]
        public async Task<string> Create(string name, string producer
                                        ,string socket,int countCores
                                        ,int countThreads,int frequency
                                        ,string turboTechnology,string typeRam
                                        ,bool haveVideoCard,int price
                                        , string imgUrl = "")
        {
            CompProcessor compProcessor = new CompProcessor
            {
                Name = name,
                Producer = producer,
                Socket = socket,
                CountCores = countCores,
                CountThreads = countThreads,
                Frequency = frequency,
                TurboTechnology = turboTechnology,
                TypeRam = typeRam,
                HaveVideoCard = haveVideoCard,
                Price = price
            };
            if (ModelState.IsValid)
            {
                _context.Add(compProcessor);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error create compBody";
        }
        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, string name, string producer
                                        , string socket, int countCores
                                        , int countThreads, int frequency
                                        , string turboTechnology, string typeRam
                                        , bool haveVideoCard, int price
                                        , string imgUrl = "")
        {
            CompProcessor compProcessor = new CompProcessor
            {
                Id = id,
                Name = name,
                Producer = producer,
                Socket = socket,
                CountCores = countCores,
                CountThreads = countThreads,
                Frequency = frequency,
                TurboTechnology = turboTechnology,
                TypeRam = typeRam,
                HaveVideoCard = haveVideoCard,
                Price = price
            };
            try
            {
                _context.Update(compProcessor);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompProcessorExists(compProcessor.Id))
                {
                    return "Error update from edit compProcessors";
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
            if (_context.CompProcessors == null)
            {
                return "Error delete compBody: Entity is nnull";
            }
            var compProcessor = await _context.CompProcessors.FindAsync(id);
            if (compProcessor != null)
            {
                _context.CompProcessors.Remove(compProcessor);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool CompProcessorExists(int id)
        {
          return (_context.CompProcessors?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
