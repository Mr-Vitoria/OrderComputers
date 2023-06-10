using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace admin_panel_react.Models.Configuration
{
    public class ComputerAssemblyConfiguration: IEntityTypeConfiguration<ComputerAssembly>
    {
        public void Configure(EntityTypeBuilder<ComputerAssembly> builder)
        {
            //builder
            //    .HasOne(ca => ca.CompBody)
            //    .WithMany(cb => cb.ComputerAssemblies)
            //    .OnDelete(DeleteBehavior.SetNull);

            //builder
            //    .HasOne(op => op.Periphery)
            //    .WithMany(p => p.OrderPeripheries)
            //    .HasForeignKey(op => op.PeripheryId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
