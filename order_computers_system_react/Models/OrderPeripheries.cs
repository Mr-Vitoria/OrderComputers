namespace order_computers_system_react.Models
{
    public class OrderPeripheries
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int PeripheryId { get; set; }
        public Periphery? Periphery { get; set; }
    }
}
