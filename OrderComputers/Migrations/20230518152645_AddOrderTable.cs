using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderComputers.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "ComputerAssemblies",
                newName: "CostPrice");

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "ComputerAssemblies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExecutorId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ComputerAssemblyId = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<double>(type: "float", nullable: false)
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
                name: "IX_ComputerAssemblies_OwnerId",
                table: "ComputerAssemblies",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ComputerAssemblyId",
                table: "Orders",
                column: "ComputerAssemblyId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_Users_OwnerId",
                table: "ComputerAssemblies",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_Users_OwnerId",
                table: "ComputerAssemblies");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_ComputerAssemblies_OwnerId",
                table: "ComputerAssemblies");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ComputerAssemblies");

            migrationBuilder.RenameColumn(
                name: "CostPrice",
                table: "ComputerAssemblies",
                newName: "Price");
        }
    }
}
