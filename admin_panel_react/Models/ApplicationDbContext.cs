using admin_panel_react.Models.Configuration;
using Microsoft.EntityFrameworkCore;

namespace admin_panel_react.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions options) : base(options) {
        
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.ApplyConfiguration(new CompBodyConfiguration());
        //    //modelBuilder.ApplyConfiguration(new CompProcessor());
        //    modelBuilder.ApplyConfiguration(new ComputerAssemblyConfiguration());
        //    modelBuilder.ApplyConfiguration(new UserConfiguration());
        //    modelBuilder.ApplyConfiguration(new OrderPeripheryConfiguration());
        //}

        public DbSet<VideoCard> VideoCards { get; set; }
        public DbSet<CompBody> CompBodies { get; set; }
        public DbSet<CompProcessor> CompProcessors { get; set; }
        public DbSet<ComputerAssembly> ComputerAssemblies { get; set; }
        public DbSet<MotherCard> MotherCards { get; set; }
        public DbSet<PowerSupplyUnit> PowerSupplyUnits { get; set; }
        public DbSet<RAMMemory> RAMMemories { get; set; }
        public DbSet<StorageDevice> StorageDevices { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Periphery> Peripheries { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<OrderPeriphery> OrderPeripheries { get; set; }
    }
}
