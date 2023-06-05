using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddTableOrderPeripheries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderPeripheries");

            migrationBuilder.CreateTable(
                name: "OrderPeriphery",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    PeripheryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderPeriphery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderPeriphery_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderPeriphery_Peripheries_PeripheryId",
                        column: x => x.PeripheryId,
                        principalTable: "Peripheries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderPeriphery_OrderId",
                table: "OrderPeriphery",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderPeriphery_PeripheryId",
                table: "OrderPeriphery",
                column: "PeripheryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderPeriphery");

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
    }
}
