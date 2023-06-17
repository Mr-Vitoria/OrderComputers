using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Controllers;
using order_computers_system_react.Models;

namespace order_computers_system_react.Services
{
    public class OrderSystemService : IOrderSystemService
    {
        private readonly ApplicationDbContext _context;

        public OrderSystemService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<object> addFeedback(int userId, string text, string date)
        {
            Feedback feedback = new Feedback()
            {
                UserId = userId,
                Text = text,
                Date = date
            };
            await _context.Feedbacks.AddAsync(feedback);

            await _context.SaveChangesAsync();
            return new
            {
                Message = "OK"
            };
        }

        public async Task<object> getConfigurationModel()
        {
            return new
            {
                CompBodies = await _context.CompBodies.ToListAsync(),
                CompProcessors = await _context.CompProcessors.ToListAsync(),
                MotherCards = await _context.MotherCards.ToListAsync(),
                PowerSupplyUnits = await _context.PowerSupplyUnits.ToListAsync(),
                RAMMemories = await _context.RAMMemories.ToListAsync(),
                StorageDevices = await _context.StorageDevices.ToListAsync(),
                VideoCards = await _context.VideoCards.ToListAsync(),

                Monitors = await _context.Peripheries.Where(pr => pr.Type == "Monitor").ToListAsync(),
                Speakers = await _context.Peripheries.Where(pr => pr.Type == "Speaker/Headphones").ToListAsync(),
                Mouses = await _context.Peripheries.Where(pr => pr.Type == "Mouse").ToListAsync(),
                Keyboards = await _context.Peripheries.Where(pr => pr.Type == "Keyboard").ToListAsync()
            };
        }

        public async Task<object> getIndexModel()
        {
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();
            await _context.Users.LoadAsync();
            var model = new
            {
                BestComputerAssemblies = new List<ComputerAssembly>(),
                TypesComputerAssembly = new List<Tuple<string, string, int>>(),
                Feedbacks = (await _context.Feedbacks.ToListAsync()).TakeLast(4).Reverse()
            };
            model.BestComputerAssemblies
                .AddRange(await _context.ComputerAssemblies
                                                        .Where(assembly => assembly.TypeComputerAssembly != "Order")
                                                        .Take(4)
                                                        .ToListAsync());
            foreach (var item in await _context.ComputerAssemblies.Select(ca => ca.TypeComputerAssembly)
                                                                .Distinct()
                                                                .Where(typeAssembly => typeAssembly != "Order")
                                                                .ToListAsync())
            {
                model.TypesComputerAssembly.Add(new Tuple<string, string, int>(item
                    , (await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly == item).FirstOrDefaultAsync()).ImgUrl
                    , (int)await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly == item).MinAsync(ca => ca.CostPrice)));
            }

            return model;
        }
    }
}
