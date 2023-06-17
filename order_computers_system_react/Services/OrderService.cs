using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using System.Text.Json;

namespace order_computers_system_react.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<object> createFullOrder(int userId, double totalPrice
            , double assemblyPrice, int bodyId
            , int processorId, int motherCardId
            , int powerSupplyId, int ramId
            , int storageId, int videoId
            , string? peripheryIds, DateOnly orderDate)
        {
            Order order = new Order()
            {
                UserId = userId,
                TotalPrice = totalPrice,
                ComputerAssembly = new ComputerAssembly()
                {
                    CompBodyId = bodyId,
                    CompProcessorId = processorId,
                    MotherCardId = motherCardId,
                    PowerSupplyUnitId = powerSupplyId,
                    RAMMemoryId = ramId,
                    StorageDeviceId = storageId,
                    VideoCardId = (videoId == -1 ? null : videoId),
                    TypeComputerAssembly = "Order",
                    CostPrice = assemblyPrice,
                    ImgUrl = ""
                },
                TypeOrder = "Full",
                Status = "Активен",
                OrderDate = orderDate.ToString()
            };

            if (peripheryIds != null)
            {
                int[] peripheries = JsonSerializer.Deserialize<int[]>(peripheryIds);

                foreach (int periipheryId in peripheries)
                {
                    await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                    {
                        Order = order,
                        PeripheryId = periipheryId
                    });
                }
            }


            await _context.AddAsync(order);
            await _context.SaveChangesAsync();

            return new {
                Message = "OK" 
            };
        }

        public async Task<object> createOrderByPrice(int userId, double budjet
            , double totalPrice, string comment
            , string peripheryIds, DateOnly orderDate)
        {

            Order order = new Order()
            {
                UserId = userId,
                TotalPrice = totalPrice,
                ComputerAssembly = new ComputerAssembly()
                {
                    TypeComputerAssembly = "Order",
                    ImgUrl = ""
                },
                Budjet = budjet,
                Comment = comment,
                TypeOrder = "Price",
                Status = "Активен",
                OrderDate = orderDate.ToString()
            };


            int[] peripheries = JsonSerializer.Deserialize<int[]>(peripheryIds);

            foreach (int periipheryId in peripheries)
            {
                await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                {
                    Order = order,
                    PeripheryId = periipheryId
                });
            }

            await _context.AddAsync(order);
            await _context.SaveChangesAsync();

            return new
            {
                Message = "OK"
            };
        }

        public async Task<object> deleteOrder(int orderId)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(or => or.Id == orderId);

            _context.ComputerAssemblies.Remove(await _context.ComputerAssemblies.FirstOrDefaultAsync(ca => ca.Id == order.ComputerAssemblyId));

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return new
            {
                Message = "OK"
            };
        }

        public async Task<object> repeatOrder(int orderId)
        {

            (await _context.Orders.FirstOrDefaultAsync(or => or.Id == orderId)).Status = "Активен";
            await _context.SaveChangesAsync();
            return new
            {
                Message = "OK"
            };
        }

        public async Task<object> cancelOrder(int orderId)
        {

            (await _context.Orders.FirstOrDefaultAsync(or => or.Id == orderId)).Status = "Отменен";
            await _context.SaveChangesAsync();

            return new
            {
                Message = "OK"
            };
        }
    }
}
