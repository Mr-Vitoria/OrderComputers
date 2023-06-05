using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using admin_panel_react.Models;
using System.Text.Json;

namespace admin_panel_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<List<Order>> Index()
        {
            await _context.ComputerAssemblies.LoadAsync();
            await _context.Users.LoadAsync();
            var orders = _context.Orders;
            return await orders.ToListAsync();
        }

        [Route("detail")]
        public async Task<Order?> Details(int? id)
        {
            if (id == null || _context.Orders == null)
            {
                return null;
            }

            var order = await _context.Orders.Include(x => x.User)
                                .Include(x => x.ComputerAssembly)
                                .Include(x => x.OrderPeripheries)
                                .ThenInclude(x => x.Periphery)
                .FirstOrDefaultAsync(m => m.Id == id);

            return order;
        }

        [Route("getselectlists")]
        public object GetSelectLists()
        {
            var model = new
            {
                ComputerAssemblies = new SelectList(_context.ComputerAssemblies, "Id", "Name"),
                Users = new SelectList(_context.Users, "Id", "Login"),


                Monitors = new SelectList(_context.Peripheries.Where(pr => pr.Type == "Monitor"), "Id", "Name"),
                Speakers = new SelectList(_context.Peripheries.Where(pr => pr.Type == "Speaker/Headphones"), "Id", "Name"),
                Mouses = new SelectList(_context.Peripheries.Where(pr => pr.Type == "Mouse"), "Id", "Name"),
                Keyboards = new SelectList(_context.Peripheries.Where(pr => pr.Type == "Keyboard"), "Id", "Name")
            };
            return model;
        }

        [Route("create")]
        public async Task<string> Create(int userId, int? computerAssemblyId,
            int totalPrice, DateOnly orderDate,
            string status, string typeOrder,
            double? budjet, string? comment,
            string peripheryIds)
        {
            Order order = new Order()
            {
                UserId = userId,
                ComputerAssemblyId = computerAssemblyId,
                TotalPrice = totalPrice,
                OrderDate = orderDate.ToString(),
                Status = status,
                TypeOrder = typeOrder,
                Budjet = budjet,
                Comment = comment
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


            if (ModelState.IsValid)
            {
                _context.Add(order);
                await _context.SaveChangesAsync();
                return "Ok";
            }
            return "Error for create order";
        }

        [HttpGet]
        [Route("edit")]
        public async Task<string> Edit(int id, int userId,
            int? computerAssemblyId, int totalPrice,
            DateOnly orderDate, string status,
            string typeOrder, double? budjet,
            string? comment, int monitorId
            , int speakerId, int mouseId
            , int keyboardId)
        {
            Order order = new Order()
            {
                Id = id,
                UserId = userId,
                ComputerAssemblyId = computerAssemblyId,
                TotalPrice = totalPrice,
                OrderDate = orderDate.ToString(),
                Status = status,
                TypeOrder = typeOrder,
                Budjet = budjet,
                Comment = comment
            };

            _context.OrderPeripheries.RemoveRange(_context.OrderPeripheries.Where(op => op.OrderId == order.Id));


            if (speakerId != -1)
                await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                {
                    Order = order,
                    PeripheryId = speakerId
                });
            if (mouseId != -1)
                await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                {
                    Order = order,
                    PeripheryId = mouseId
                });
            if (keyboardId != -1)
                await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                {
                    Order = order,
                    PeripheryId = keyboardId
                });
            if (monitorId != -1)
                await _context.OrderPeripheries.AddAsync(new OrderPeriphery()
                {
                    Order = order,
                    PeripheryId = monitorId
                });

            try
            {
                _context.Update(order);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(order.Id))
                {
                    return "Error update order";
                }
                else
                {
                    throw;
                }
            }
            return "Ok";
        }


        [Route("delete")]
        public async Task<string> DeleteConfirmed(int id)
        {
            if (_context.Orders == null)
            {
                return "Entity set 'ApplicationDbContext.Orders'  is null.";
            }
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
            }

            await _context.SaveChangesAsync();
            return "Ok";
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
