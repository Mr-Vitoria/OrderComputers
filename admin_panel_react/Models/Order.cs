using System.ComponentModel.DataAnnotations.Schema;

namespace admin_panel_react.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? ComputerAssemblyId { get; set; }

        public double TotalPrice { get; set; }
        public string Status { get; set; }
        public string OrderDate { get; set; }

        public string TypeOrder { get; set; } = "FullOrder";
        public double? Budjet { get; set; }
        public string? Comment { get; set; }

        public User User { get; set; }
        public ComputerAssembly? ComputerAssembly { get; set; }
        public IEnumerable<OrderPeripheries> OrderPeripheries { get; set; }

    }
}
