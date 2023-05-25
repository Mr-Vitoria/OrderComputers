using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompBodies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FormFactor = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompBodies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompProcessors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Producer = table.Column<string>(type: "text", nullable: false),
                    Socket = table.Column<string>(type: "text", nullable: false),
                    CountCores = table.Column<int>(type: "integer", nullable: false),
                    CountThreads = table.Column<int>(type: "integer", nullable: false),
                    Frequency = table.Column<int>(type: "integer", nullable: false),
                    TurboTechnology = table.Column<string>(type: "text", nullable: false),
                    TypeRam = table.Column<string>(type: "text", nullable: false),
                    HaveVideoCard = table.Column<bool>(type: "boolean", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompProcessors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MotherCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Size = table.Column<string>(type: "text", nullable: false),
                    Socket = table.Column<string>(type: "text", nullable: false),
                    HaveWiFiModul = table.Column<bool>(type: "boolean", nullable: false),
                    HaveBluetoothModul = table.Column<bool>(type: "boolean", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MotherCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PowerSupplyUnits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FormFactor = table.Column<string>(type: "text", nullable: false),
                    Power = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerSupplyUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RAMMemories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: false),
                    Frequency = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RAMMemories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StorageDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Port = table.Column<string>(type: "text", nullable: false),
                    Count = table.Column<double>(type: "double precision", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorageDevices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: false),
                    TypeUser = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Producer = table.Column<string>(type: "text", nullable: false),
                    Family = table.Column<string>(type: "text", nullable: false),
                    LetterIndex = table.Column<string>(type: "text", nullable: false),
                    Generation = table.Column<string>(type: "text", nullable: false),
                    Series = table.Column<string>(type: "text", nullable: false),
                    TypeMemory = table.Column<string>(type: "text", nullable: false),
                    CountMemory = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComputerAssemblies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompBodyId = table.Column<int>(type: "integer", nullable: false),
                    MotherCardId = table.Column<int>(type: "integer", nullable: false),
                    PowerSupplyUnitId = table.Column<int>(type: "integer", nullable: false),
                    CompProcessorId = table.Column<int>(type: "integer", nullable: false),
                    RAMMemoryId = table.Column<int>(type: "integer", nullable: false),
                    StorageDeviceId = table.Column<int>(type: "integer", nullable: false),
                    VideoCardId = table.Column<int>(type: "integer", nullable: false),
                    OwnerId = table.Column<int>(type: "integer", nullable: true),
                    CostPrice = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComputerAssemblies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_CompBodies_CompBodyId",
                        column: x => x.CompBodyId,
                        principalTable: "CompBodies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_CompProcessors_CompProcessorId",
                        column: x => x.CompProcessorId,
                        principalTable: "CompProcessors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_MotherCards_MotherCardId",
                        column: x => x.MotherCardId,
                        principalTable: "MotherCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_PowerSupplyUnits_PowerSupplyUnitId",
                        column: x => x.PowerSupplyUnitId,
                        principalTable: "PowerSupplyUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_RAMMemories_RAMMemoryId",
                        column: x => x.RAMMemoryId,
                        principalTable: "RAMMemories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_StorageDevices_StorageDeviceId",
                        column: x => x.StorageDeviceId,
                        principalTable: "StorageDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                        column: x => x.VideoCardId,
                        principalTable: "VideoCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExecutorId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ComputerAssemblyId = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_ComputerAssemblies_ComputerAssemblyId",
                        column: x => x.ComputerAssemblyId,
                        principalTable: "ComputerAssemblies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_CompBodyId",
                table: "ComputerAssemblies",
                column: "CompBodyId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_CompProcessorId",
                table: "ComputerAssemblies",
                column: "CompProcessorId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_MotherCardId",
                table: "ComputerAssemblies",
                column: "MotherCardId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_OwnerId",
                table: "ComputerAssemblies",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_PowerSupplyUnitId",
                table: "ComputerAssemblies",
                column: "PowerSupplyUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_RAMMemoryId",
                table: "ComputerAssemblies",
                column: "RAMMemoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_StorageDeviceId",
                table: "ComputerAssemblies",
                column: "StorageDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_VideoCardId",
                table: "ComputerAssemblies",
                column: "VideoCardId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ComputerAssemblyId",
                table: "Orders",
                column: "ComputerAssemblyId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ComputerAssemblies");

            migrationBuilder.DropTable(
                name: "CompBodies");

            migrationBuilder.DropTable(
                name: "CompProcessors");

            migrationBuilder.DropTable(
                name: "MotherCards");

            migrationBuilder.DropTable(
                name: "PowerSupplyUnits");

            migrationBuilder.DropTable(
                name: "RAMMemories");

            migrationBuilder.DropTable(
                name: "StorageDevices");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "VideoCards");
        }
    }
}
