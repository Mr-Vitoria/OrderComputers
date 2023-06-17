namespace order_computers_system_react.Services
{
    public interface IAssemblyListService
    {
        Task<object> getAssemblyList();
        Task<object> getSortOption();
    }
}
