using order_computers_system_react.Models;

namespace order_computers_system_react.Services
{
    public interface IUserService
    {
        Task<User?> getUserById(int userId);
        Task<User?> getUserByPhone(string phone);
        Task<object> changeUserInfo(int userId, string imgUrl);
        Task<object> createUser(string phone, string login, string name, string password);
        Task<object> getUserOrders(int userId);
    }
}
