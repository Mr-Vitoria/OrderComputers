using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeOrderAndOrderPeripheries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssemblyPeripheries");

            migrationBuilder.AddColumn<double>(
                name: "Budjet",
                table: "Orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeOrder",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "OrderPeripheries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    PeripheryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderPeripheries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderPeripheries_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderPeripheries_Peripheries_PeripheryId",
                        column: x => x.PeripheryId,
                        principalTable: "Peripheries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPeripheries_OrderId",
                table: "OrderPeripheries",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPeripheries_PeripheryId",
                table: "OrderPeripheries",
                column: "PeripheryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderPeripheries");

            migrationBuilder.DropColumn(
                name: "Budjet",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TypeOrder",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "AssemblyPeripheries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComputerAssemblyId = table.Column<int>(type: "integer", nullable: false),
                    PeripheryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssemblyPeripheries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssemblyPeripheries_ComputerAssemblies_ComputerAssemblyId",
                        column: x => x.ComputerAssemblyId,
                        principalTable: "ComputerAssemblies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssemblyPeripheries_Peripheries_PeripheryId",
                        column: x => x.PeripheryId,
                        principalTable: "Peripheries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssemblyPeripheries_ComputerAssemblyId",
                table: "AssemblyPeripheries",
                column: "ComputerAssemblyId");

            migrationBuilder.CreateIndex(
                name: "IX_AssemblyPeripheries_PeripheryId",
                table: "AssemblyPeripheries",
                column: "PeripheryId");
        }
    }
}
