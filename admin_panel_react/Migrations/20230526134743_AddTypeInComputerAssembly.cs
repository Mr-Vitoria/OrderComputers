using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeInComputerAssembly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeComputerAssembly",
                table: "ComputerAssemblies",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeComputerAssembly",
                table: "ComputerAssemblies");
        }
    }
}
