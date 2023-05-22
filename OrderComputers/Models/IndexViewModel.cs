namespace OrderComputers.Models
{
    public class IndexViewModel
    {
        public List<ComputerAssembly> bestComputerAssemblies { get; set; }
        public List<Tuple<string, int>> typesComputerAssembly { get; set; } = new List<Tuple<string, int>>();
    }
}
