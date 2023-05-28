namespace order_computers_system_react.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string Password { get; set; }
        public string TypeUser { get; set; }


        public string? ImgUrl { get; set; }
    }
}
