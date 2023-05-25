namespace admin_panel_react.Models
{
    public class MotherCard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public string Socket { get; set; }
        public bool HaveWiFiModul { get; set; }
        public bool HaveBluetoothModul { get; set; }


        public double Price { get; set; }
    }
}
