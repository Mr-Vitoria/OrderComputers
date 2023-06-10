using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace admin_panel_react.Models.Configuration
{
    public class OrderPeripheryConfiguration: IEntityTypeConfiguration<OrderPeriphery>
    {
        public void Configure(EntityTypeBuilder<OrderPeriphery> builder)
        {
            builder
                .HasOne(op => op.Order)
                .WithMany(p => p.OrderPeripheries)
                .HasForeignKey(op => op.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(op => op.Periphery)
                .WithMany(p => p.OrderPeripheries)
                .HasForeignKey(op => op.PeripheryId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
