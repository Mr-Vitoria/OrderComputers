namespace OrderComputers.Models
{
    public class IndexViewModel
    {
        public List<ComputerAssembly> BestComputerAssemblies { get; set; } = new List<ComputerAssembly>();
        public List<Tuple<string,string, int>> TypesComputerAssembly { get; set; } = new List<Tuple<string, string, int>>();
    }
}
