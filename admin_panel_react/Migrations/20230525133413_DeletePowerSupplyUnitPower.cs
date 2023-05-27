using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class DeletePowerSupplyUnitPower : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Power",
                table: "PowerSupplyUnits");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Power",
                table: "PowerSupplyUnits",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
