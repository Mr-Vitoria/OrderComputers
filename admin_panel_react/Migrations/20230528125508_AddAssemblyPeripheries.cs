using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddAssemblyPeripheries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssemblyPeripheries");
        }
    }
}
