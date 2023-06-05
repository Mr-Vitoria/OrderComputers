namespace admin_panel_react.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }

        public User User { get; set; }
    }
}
