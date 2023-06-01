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

            await _context.ComputerAssemblies.LoadAsync();
            await _context.Users.LoadAsync();

            var order = await _context.Orders
                .FirstOrDefaultAsync(m => m.Id == id);

            return order;
        }

        [Route("getselectlists")]
        public object GetSelectLists()
        {
            var model = new
            {
                ComputerAssemblies = new SelectList(_context.ComputerAssemblies, "Id", "Name"),
                Users = new SelectList(_context.Users, "Id", "Login")
            };
            return model;
        }

        [Route("create")]
        public async Task<string> Create(int userId,int? computerAssemblyId,
            int totalPrice, DateOnly orderDate, 
            string status,string typeOrder,
            double? budjet, string? comment)
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
            string? comment)
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
