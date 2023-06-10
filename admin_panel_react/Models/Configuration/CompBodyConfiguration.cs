using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace admin_panel_react.Models.Configuration
{
	public class CompBodyConfiguration: IEntityTypeConfiguration<CompBody>
    {
        public void Configure(EntityTypeBuilder<CompBody> builder)
        {

            builder
                .Property(cb => cb.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(cb => cb.FormFactor)
                .IsRequired()
                .HasMaxLength(20);

        }
    }
}
