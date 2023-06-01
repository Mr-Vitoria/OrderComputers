using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddTableOrderPeripheries2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPeriphery_Orders_OrderId",
                table: "OrderPeriphery");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPeriphery_Peripheries_PeripheryId",
                table: "OrderPeriphery");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderPeriphery",
                table: "OrderPeriphery");

            migrationBuilder.RenameTable(
                name: "OrderPeriphery",
                newName: "OrderPeripheries");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPeriphery_PeripheryId",
                table: "OrderPeripheries",
                newName: "IX_OrderPeripheries_PeripheryId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPeriphery_OrderId",
                table: "OrderPeripheries",
                newName: "IX_OrderPeripheries_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderPeripheries",
                table: "OrderPeripheries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPeripheries_Orders_OrderId",
                table: "OrderPeripheries",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPeripheries_Peripheries_PeripheryId",
                table: "OrderPeripheries",
                column: "PeripheryId",
                principalTable: "Peripheries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPeripheries_Orders_OrderId",
                table: "OrderPeripheries");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPeripheries_Peripheries_PeripheryId",
                table: "OrderPeripheries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderPeripheries",
                table: "OrderPeripheries");

            migrationBuilder.RenameTable(
                name: "OrderPeripheries",
                newName: "OrderPeriphery");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPeripheries_PeripheryId",
                table: "OrderPeriphery",
                newName: "IX_OrderPeriphery_PeripheryId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPeripheries_OrderId",
                table: "OrderPeriphery",
                newName: "IX_OrderPeriphery_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderPeriphery",
                table: "OrderPeriphery",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPeriphery_Orders_OrderId",
                table: "OrderPeriphery",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPeriphery_Peripheries_PeripheryId",
                table: "OrderPeriphery",
                column: "PeripheryId",
                principalTable: "Peripheries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
