namespace order_computers_system_react.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }

        public User User { get; set; }
    }
}
