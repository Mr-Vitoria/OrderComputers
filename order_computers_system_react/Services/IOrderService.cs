namespace order_computers_system_react.Services
{
    public interface IOrderService
    {
        Task<object> createOrderByPrice(int userId, double budjet
            , double totalPrice, string comment
            , string peripheryIds, DateOnly orderDate);

        Task<object> createFullOrder(int userId, double totalPrice, double assemblyPrice
            , int bodyId, int processorId
            , int motherCardId, int powerSupplyId
            , int ramId, int storageId
            , int videoId, string? peripheryIds
            , DateOnly orderDate);
        
        Task<object> deleteOrder(int orderId);

        Task<object> repeatOrder(int orderId);
        
        Task<object> cancelOrder(int orderId);
    }
}
