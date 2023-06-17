using Microsoft.EntityFrameworkCore;
using order_computers_system_react.Models;

namespace order_computers_system_react.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<object> changeUserInfo(int userId, string imgUrl)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Id == userId);
            user.ImgUrl = imgUrl;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new
            {
                Status = 0,
                Message = "OK"
            };
        }

        public async Task<object> createUser(string phone, string login, string name, string password)
        {

            User user = await _context.Users.FirstOrDefaultAsync(us => us.Phone == phone);
            if (user != null)
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

        public async Task<User?> getUserById(int userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(m => m.Id == userId);
        }

        public async Task<User?> getUserByPhone(string phone)
        {
            return await _context.Users
                .FirstOrDefaultAsync(m => m.Phone == phone);
        }

        public async Task<object> getUserOrders(int userId)
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

            return await _context.Orders.Where(or => or.UserId == userId).OrderBy(or => or.Id).Reverse().ToListAsync();
        }
    }
}
