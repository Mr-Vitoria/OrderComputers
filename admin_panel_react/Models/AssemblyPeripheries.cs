namespace admin_panel_react.Models
{
    public class AssemblyPeripheries
    {
        public int Id { get; set; }
        public int ComputerAssemblyId { get; set; }
        public ComputerAssembly ComputerAssembly { get; set; }
        public int PeripheryId { get; set; }
        public Periphery? Periphery { get; set; }
    }
}
