using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;
using System.Text.Json;
using System.Threading;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace order_computers_system_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderSystemController : Controller
    {
        private readonly ILogger<OrderSystemController> _logger;
        private readonly ApplicationDbContext _context;

        public OrderSystemController(ILogger<OrderSystemController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("getindexmodel")]
        public async Task<object> Index()
        {
            await _context.Users.LoadAsync();
            var model= new {
                BestComputerAssemblies = new List<ComputerAssembly>(),
                TypesComputerAssembly = new List<Tuple<string,string,int>>(),
                Feedbacks = (await _context.Feedbacks.ToListAsync()).TakeLast(4)

        };
            model.BestComputerAssemblies.AddRange(await _context.ComputerAssemblies.Take(4).ToListAsync());
            foreach (var item in await _context.ComputerAssemblies.Select(ca => ca.TypeComputerAssembly).Distinct().ToListAsync())
            {
                model.TypesComputerAssembly.Add(new Tuple<string, string, int>(item
                    , (await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly == item).FirstOrDefaultAsync()).ImgUrl
                    ,(int)await _context.ComputerAssemblies.Where(ca => ca.TypeComputerAssembly== item).MinAsync(ca => ca.CostPrice)));
            }

            return model;
        }
        [HttpGet]
        [Route("getuser")]
        public async Task<User?> Details(string phone)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Phone == phone);

            return user;
        }
        [HttpGet]
        [Route("getuserbyid")]
        public async Task<User?> Details(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Id== id);

            return user;
        }


        [HttpGet]
        [Route("createuser")]
        public async Task<object> Registration(string phone, string login, string name, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(us=>us.Phone==phone);
            if(user!=null)
            {
                return new
                {
                    Status = -1,
                    Message = "Пользователь с таким номером телефона уже есть"
                };
            }
            user = new User()
            {
                Name = name,
                Phone = phone,
                Login = login,
                Password = password,
                TypeUser = "Common"
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return new
            {
                Status = 0,
                Message = "Вы успешно зарегестрировались"
            };
        }

        [HttpGet]
        [Route("gethistoryuser")]
        public async Task<object> Orders(int id)
        {
            await _context.Users.LoadAsync();
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.Peripheries.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();
            await _context.ComputerAssemblies.LoadAsync();
            await _context.OrderPeripheries.LoadAsync();


            List<Order> orders = await _context.Orders.Where(or => or.UserId == id).ToListAsync();
            return orders;
        }

        [HttpGet]
        [Route("getconfigurationmodel")]
        public async Task<object> ConfigurationPC()
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

        [HttpGet]
        [Route("createorder")]
        public async Task<object> CreateOrder(int userId,double totalPrice, double assemblyPrice
            , int bodyId, int processorId
            ,int motherCardId, int powerSupplyId
            ,int ramId, int storageId
            ,int videoId, string peripheryIds
            , DateOnly orderDate)
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
                    VideoCardId = videoId,
                    TypeComputerAssembly = "Users",
                    CostPrice = assemblyPrice,
                    ImgUrl = "",
                    OwnerId = userId
                },
                TypeOrder = "Full",
                Status = "Active",
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


            return "Ok";
        }
        [HttpGet]
        [Route("createorderbyprice")]
        public async Task<object> CreateOrderByPrice(int userId, double budjet
            , double totalPrice, string comment
            , string peripheryIds, DateOnly orderDate)
        {
            Order order = new Order()
            {
                UserId = userId,
                TotalPrice = totalPrice,
                ComputerAssembly = new ComputerAssembly()
                {
                    TypeComputerAssembly = "Users",
                    ImgUrl = "",
                    OwnerId = userId
                },
                Budjet =budjet,
                Comment = comment,
                TypeOrder = "Price",
                Status = "Active",
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


            return "Ok";
        }

        [HttpGet]
        [Route("deleteorder")]
        public async Task<object> DeleteOrder(int orderId)
        {
            _context.Orders.Remove(await _context.Orders.FirstOrDefaultAsync(or=>or.Id==orderId));
            await _context.SaveChangesAsync();


            return "Ok";
        }
        [HttpGet]
        [Route("repeatorder")]
        public async Task<object> RepeatOrder(int orderId)
        {
            (await _context.Orders.FirstOrDefaultAsync(or => or.Id == orderId)).Status = "Active";
            await _context.SaveChangesAsync();

            return "Ok";
        }
        [HttpGet]
        [Route("cancelorder")]
        public async Task<object> CancelOrder(int orderId)
        {
            (await _context.Orders.FirstOrDefaultAsync(or => or.Id == orderId)).Status = "Cancel";
            await _context.SaveChangesAsync();

            return "Ok";
        }


        [HttpGet]
        [Route("addFeedback")]
        public async Task<object> AddFeedback(int userId,string text)
        {
            Feedback feedback = new Feedback()
            {
                UserId = userId,
                Text = text
            };
            await _context.Feedbacks.AddAsync(feedback);

            await _context.SaveChangesAsync();
            return "Ok";
        }

        [HttpGet]
        [Route("getassemblylist")]
        public async Task<object> GetAssemblyList()
        {
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.Peripheries.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();


            return await _context.ComputerAssemblies.Where(assembly=>assembly.CompProcessor.Name!=null).ToListAsync();
        }

        [HttpGet]
        [Route("getselectoption")]
        public async Task<object> GetSelectOption()
        {
            await _context.CompProcessors.LoadAsync();
            await _context.CompBodies.LoadAsync();
            await _context.VideoCards.LoadAsync();
            await _context.MotherCards.LoadAsync();
            await _context.PowerSupplyUnits.LoadAsync();
            await _context.Peripheries.LoadAsync();
            await _context.RAMMemories.LoadAsync();
            await _context.StorageDevices.LoadAsync();


            return new {
                Processors = new {
                    Producers = _context.CompProcessors.Select(proc => proc.Producer).Distinct(),
                    Sockets = _context.CompProcessors.Select(proc => proc.Socket).Distinct(),
                    MinCountCores = await _context.CompProcessors.Select(proc => proc.CountCores).MinAsync(),
                    MaxCountCores = await _context.CompProcessors.Select(proc => proc.CountCores).MaxAsync(),
                    MinFrequency = await _context.CompProcessors.Select(proc => proc.Frequency).MinAsync(),
                    MaxFrequency = await _context.CompProcessors.Select(proc => proc.Frequency).MaxAsync()
                }
            };
        }
    }
}
