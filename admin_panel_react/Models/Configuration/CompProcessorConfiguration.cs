using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace admin_panel_react.Models.Configuration
{
    public class CompProcessorConfiguration : IEntityTypeConfiguration<CompProcessor>
    {
        public void Configure(EntityTypeBuilder<CompProcessor> builder)
        {
            builder
                .Property(proc => proc.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(proc => proc.Producer)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(proc => proc.Socket)
                .IsRequired()
                .HasMaxLength(30);

            builder
                .Property(proc => proc.TypeRam)
                .IsRequired()
                .HasMaxLength(30);

        }
    }
}
