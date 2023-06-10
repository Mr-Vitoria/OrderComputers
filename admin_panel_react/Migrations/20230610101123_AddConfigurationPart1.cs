using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddConfigurationPart1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_Users_OwnerId",
                table: "ComputerAssemblies");

            migrationBuilder.DropIndex(
                name: "IX_ComputerAssemblies_OwnerId",
                table: "ComputerAssemblies");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ComputerAssemblies");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ComputerAssemblies_OwnerId",
                table: "ComputerAssemblies",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_Users_OwnerId",
                table: "ComputerAssemblies",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
