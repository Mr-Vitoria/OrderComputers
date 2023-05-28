using System.ComponentModel.DataAnnotations.Schema;

namespace order_computers_system_react.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ComputerAssemblyId { get; set; }

        public double TotalPrice { get; set; }

        public User User { get; set; }
        public ComputerAssembly ComputerAssembly { get; set; }

    }
}
