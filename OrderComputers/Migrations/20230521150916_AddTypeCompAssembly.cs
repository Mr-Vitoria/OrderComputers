using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderComputers.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeCompAssembly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "typeComputerAssembly",
                table: "ComputerAssemblies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "typeComputerAssembly",
                table: "ComputerAssemblies");
        }
    }
}
