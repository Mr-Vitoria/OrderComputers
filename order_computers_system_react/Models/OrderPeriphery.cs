using System.Text.Json.Serialization;

namespace order_computers_system_react.Models
{
    public class OrderPeriphery
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
        public int PeripheryId { get; set; }
        public Periphery? Periphery { get; set; }
    }
}
