using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace admin_panel_react.Models.Configuration
{
	public class UserConfiguration: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //builder.HasData(new List<User> {
            //    new User {Id=1
            //                ,Login = "Vitoria"
            //                ,Name = "Дмитрий"
            //                ,Password="3214545454DIma"
            //                ,Phone="89209972501"
            //                ,TypeUser="Admin"
            //                ,Email="olegnikod3@gmail.com"
            //                ,ImgUrl = "https://oir.mobi/uploads/posts/2022-07/thumbs/1658192140_22-oir-mobi-p-arti-miku-26.jpg"}
            //                });

            builder
                .Property(us => us.Login)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(us => us.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(us => us.Phone)
                .IsRequired()
                .HasMaxLength(20);

            builder
                .Property(us => us.TypeUser)
                .IsRequired()
                .HasMaxLength(10);

            builder
                .Property(us => us.Email)
                .IsRequired(false)
                .HasMaxLength(50);

            builder
                .Property(us => us.Password)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
