using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Controllers;
using order_computers_system_react.Models;

namespace order_computers_system_react.Services
{
    public class AssemblyListService : IAssemblyListService
    {
        private readonly ApplicationDbContext _context;

        public AssemblyListService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<object> getAssemblyList()
        {
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();


            return await _context.ComputerAssemblies.Where(assembly => assembly.TypeComputerAssembly != "Order").ToListAsync();
        }

        public async Task<object> getSortOption()
        {
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.Peripheries.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();


            return new
            {
                Processors = new
                {
                    Producers = _context.CompProcessors.Select(proc => proc.Producer).Distinct(),
                    Sockets = _context.CompProcessors.Select(proc => proc.Socket).Distinct(),
                    MinCountCores = await _context.CompProcessors.Select(proc => proc.CountCores).MinAsync(),
                    MaxCountCores = await _context.CompProcessors.Select(proc => proc.CountCores).MaxAsync(),
                    MinFrequency = await _context.CompProcessors.Select(proc => proc.Frequency).MinAsync(),
                    MaxFrequency = await _context.CompProcessors.Select(proc => proc.Frequency).MaxAsync()

                },

                Body = new
                {
                    FormFactor = _context.CompBodies.Select(body => body.FormFactor).Distinct()
                },

                VideoCard = new
                {
                    Producers = _context.VideoCards.Select(videoCard => videoCard.Producer).Distinct(),
                    Types = _context.VideoCards.Select(videoCard => videoCard.Type).Distinct(),
                    MinCount = await _context.VideoCards.Select(videoCard => videoCard.Count).MinAsync(),
                    MaxCount = await _context.VideoCards.Select(videoCard => videoCard.Count).MaxAsync()
                },

                MotherCard = new
                {
                    Sizes = _context.MotherCards.Select(motherCard => motherCard.Size).Distinct(),
                    Sockets = _context.MotherCards.Select(motherCard => motherCard.Socket).Distinct()
                },

                PowerSupplyUnit = new
                {
                    FormFactor = _context.PowerSupplyUnits.Select(unit => unit.FormFactor).Distinct(),
                    MinPower = await _context.PowerSupplyUnits.Select(unit => unit.Power).MinAsync(),
                    MaxPower = await _context.PowerSupplyUnits.Select(unit => unit.Power).MaxAsync()
                },

                RAMMemory = new
                {
                    Type = _context.RAMMemories.Select(memory => memory.Type).Distinct(),
                    MinCount = await _context.RAMMemories.Select(memory => memory.Count).MinAsync(),
                    MaxCount = await _context.RAMMemories.Select(memory => memory.Count).MaxAsync(),
                    MinFrequency = await _context.RAMMemories.Select(memory => memory.Frequency).MinAsync(),
                    MaxFrequency = await _context.RAMMemories.Select(memory => memory.Frequency).MaxAsync()
                },

                StorageDevice = new
                {
                    Type = _context.StorageDevices.Select(storage => storage.Type).Distinct(),
                    MinCount = await _context.StorageDevices.Select(storage => storage.Count).MinAsync(),
                    MaxCount = await _context.StorageDevices.Select(storage => storage.Count).MaxAsync(),
                }
            };
        }
    }
}
