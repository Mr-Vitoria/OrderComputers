namespace order_computers_system_react.Services
{
    public interface IOrderSystemService
    {
        Task<object> getIndexModel();
        Task<object> getConfigurationModel();
        Task<object> addFeedback(int userId, string text, string date);
    }
}
