namespace admin_panel_react.Models
{
    public class StorageDevice
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Count { get; set; }
        public string Type { get; set; }
        public string? ImgUrl { get; set; }

        public double Price { get; set; }
    }
}
