using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class RenameColumnFromVideoCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TypeMemory",
                table: "VideoCards",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "CountMemory",
                table: "VideoCards",
                newName: "Count");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "VideoCards",
                newName: "TypeMemory");

            migrationBuilder.RenameColumn(
                name: "Count",
                table: "VideoCards",
                newName: "CountMemory");
        }
    }
}
