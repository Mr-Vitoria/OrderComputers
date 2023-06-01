namespace order_computers_system_react.Models
{
    public class ComputerAssembly
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? CompBodyId { get; set; }
        public int? MotherCardId { get; set; }
        public int? PowerSupplyUnitId { get; set; }
        public int? CompProcessorId { get; set; }
        public int? RAMMemoryId { get; set; }
        public int? StorageDeviceId { get; set; }
        public int? VideoCardId { get; set; }
        public int? OwnerId { get; set; }

        public string TypeComputerAssembly { get; set; }
        public string? ImgUrl { get; set; }


        public CompBody? CompBody { get; set; }
        public MotherCard? MotherCard { get; set; }
        public PowerSupplyUnit? PowerSupplyUnit { get; set; }
        public CompProcessor? CompProcessor { get; set; }
        public RAMMemory? RAMMemory { get; set; }
        public StorageDevice? StorageDevice { get; set; }
        public VideoCard? VideoCard { get; set; }
        public User? Owner { get; set; }



        public double CostPrice { get; set; }
    }
}
