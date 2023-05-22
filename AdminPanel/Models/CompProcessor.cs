namespace AdminPanel.Models
{
    public class CompProcessor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Producer { get; set; }
        public string Socket { get; set; }
        public int CountCores { get; set; }
        public int CountThreads { get; set; }
        public int Frequency { get; set; }
        public string TurboTechnology { get; set; }
        public string TypeRam { get; set; }
        public bool HaveVideoCard { get; set; }


        public double Price { get; set; }
    }
}
