using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddImageInTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "VideoCards",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "StorageDevices",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "RAMMemories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "PowerSupplyUnits",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Peripheries",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "MotherCards",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImgUrl",
                table: "ComputerAssemblies",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ComputerAssemblies",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "CompProcessors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "CompBodies",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "VideoCards");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "StorageDevices");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "RAMMemories");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "PowerSupplyUnits");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Peripheries");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "MotherCards");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ComputerAssemblies");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "CompProcessors");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "CompBodies");

            migrationBuilder.AlterColumn<string>(
                name: "ImgUrl",
                table: "ComputerAssemblies",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
