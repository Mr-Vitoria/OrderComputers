using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderComputers.Migrations
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormFactor = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompBodies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompProcessors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Producer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Socket = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountCores = table.Column<int>(type: "int", nullable: false),
                    CountThreads = table.Column<int>(type: "int", nullable: false),
                    Frequency = table.Column<int>(type: "int", nullable: false),
                    TurboTechnology = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeRam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HaveVideoCard = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompProcessors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MotherCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Socket = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HaveWiFiModul = table.Column<bool>(type: "bit", nullable: false),
                    HaveBluetoothModul = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MotherCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PowerSupplyUnits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormFactor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Power = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerSupplyUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RAMMemories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false),
                    Frequency = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RAMMemories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StorageDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Port = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Count = table.Column<double>(type: "float", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StorageDevices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Producer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Family = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetterIndex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Generation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Series = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeMemory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountMemory = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoCards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComputerAssemblies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompBodyId = table.Column<int>(type: "int", nullable: false),
                    MotherCardId = table.Column<int>(type: "int", nullable: false),
                    PowerSupplyUnitId = table.Column<int>(type: "int", nullable: false),
                    CompProcessorId = table.Column<int>(type: "int", nullable: false),
                    RAMMemoryId = table.Column<int>(type: "int", nullable: false),
                    StorageDeviceId = table.Column<int>(type: "int", nullable: false),
                    VideoCardId = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                        column: x => x.VideoCardId,
                        principalTable: "VideoCards",
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                name: "VideoCards");
        }
    }
}
