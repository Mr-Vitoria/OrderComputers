using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using order_computers_system_react.Services;
using System.Text.Json;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : Controller
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IOrderService _orderService;

        public OrdersController(ILogger<OrdersController> logger, IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpGet]
        [Route("createorder")]
        public async Task<object> CreateOrder(int userId, double totalPrice, double assemblyPrice
            , int bodyId, int processorId
            , int motherCardId, int powerSupplyId
            , int ramId, int storageId
            , int videoId, string? peripheryIds
            , DateOnly orderDate)
        {
            return await _orderService.createFullOrder(userId,totalPrice,assemblyPrice
                ,bodyId,processorId,motherCardId
                ,powerSupplyId, ramId
                ,storageId,videoId
                ,peripheryIds, orderDate);
        }

        [HttpGet]
        [Route("createorderbyprice")]
        public async Task<object> CreateOrderByPrice(int userId, double budjet
            , double totalPrice, string comment
            , string peripheryIds, DateOnly orderDate)
        {
            return await _orderService.createOrderByPrice(userId,budjet
                ,totalPrice, comment
                ,peripheryIds,orderDate);
        }

        [HttpGet]
        [Route("deleteorder")]
        public async Task<object> DeleteOrder(int orderId)
        {
            return await _orderService.deleteOrder(orderId);
        }

        [HttpGet]
        [Route("repeatorder")]
        public async Task<object> RepeatOrder(int orderId)
        {
            return await _orderService.repeatOrder(orderId);
        }

        [HttpGet]
        [Route("cancelorder")]
        public async Task<object> CancelOrder(int orderId)
        {
            return await _orderService.cancelOrder(orderId);
        }
    }
}
