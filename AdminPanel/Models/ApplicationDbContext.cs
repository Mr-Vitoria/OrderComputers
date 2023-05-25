using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AdminPanel.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions options) : base(options) {}
        // конфигурация контекста
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.Use
            //// получаем файл конфигурации
            //IConfigurationRoot configuration = new ConfigurationBuilder()
            //    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            //    .AddJsonFile("appsettings.json")
            //    .Build();
            //// устанавливаем для контекста строку подключения
            //// инициализируем саму строку подключения
            //optionsBuilder.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        }


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
    }
}
