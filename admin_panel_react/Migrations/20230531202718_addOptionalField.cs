using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class addOptionalField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_CompBodies_CompBodyId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_CompProcessors_CompProcessorId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_MotherCards_MotherCardId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_PowerSupplyUnits_PowerSupplyUnitId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_RAMMemories_RAMMemoryId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_StorageDevices_StorageDeviceId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ComputerAssemblies_ComputerAssemblyId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ComputerAssemblyId",
                table: "Orders",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Orders",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<double>(
                name: "Budjet",
                table: "Orders",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<int>(
                name: "VideoCardId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "StorageDeviceId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "RAMMemoryId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PowerSupplyUnitId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ComputerAssemblies",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "MotherCardId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CompProcessorId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CompBodyId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_CompBodies_CompBodyId",
                table: "ComputerAssemblies",
                column: "CompBodyId",
                principalTable: "CompBodies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_CompProcessors_CompProcessorId",
                table: "ComputerAssemblies",
                column: "CompProcessorId",
                principalTable: "CompProcessors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_MotherCards_MotherCardId",
                table: "ComputerAssemblies",
                column: "MotherCardId",
                principalTable: "MotherCards",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_PowerSupplyUnits_PowerSupplyUnitId",
                table: "ComputerAssemblies",
                column: "PowerSupplyUnitId",
                principalTable: "PowerSupplyUnits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_RAMMemories_RAMMemoryId",
                table: "ComputerAssemblies",
                column: "RAMMemoryId",
                principalTable: "RAMMemories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_StorageDevices_StorageDeviceId",
                table: "ComputerAssemblies",
                column: "StorageDeviceId",
                principalTable: "StorageDevices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                table: "ComputerAssemblies",
                column: "VideoCardId",
                principalTable: "VideoCards",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ComputerAssemblies_ComputerAssemblyId",
                table: "Orders",
                column: "ComputerAssemblyId",
                principalTable: "ComputerAssemblies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_CompBodies_CompBodyId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_CompProcessors_CompProcessorId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_MotherCards_MotherCardId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_PowerSupplyUnits_PowerSupplyUnitId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_RAMMemories_RAMMemoryId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_StorageDevices_StorageDeviceId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                table: "ComputerAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ComputerAssemblies_ComputerAssemblyId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ComputerAssemblyId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Budjet",
                table: "Orders",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "VideoCardId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StorageDeviceId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RAMMemoryId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PowerSupplyUnitId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ComputerAssemblies",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MotherCardId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CompProcessorId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CompBodyId",
                table: "ComputerAssemblies",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_CompBodies_CompBodyId",
                table: "ComputerAssemblies",
                column: "CompBodyId",
                principalTable: "CompBodies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_CompProcessors_CompProcessorId",
                table: "ComputerAssemblies",
                column: "CompProcessorId",
                principalTable: "CompProcessors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_MotherCards_MotherCardId",
                table: "ComputerAssemblies",
                column: "MotherCardId",
                principalTable: "MotherCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_PowerSupplyUnits_PowerSupplyUnitId",
                table: "ComputerAssemblies",
                column: "PowerSupplyUnitId",
                principalTable: "PowerSupplyUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_RAMMemories_RAMMemoryId",
                table: "ComputerAssemblies",
                column: "RAMMemoryId",
                principalTable: "RAMMemories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_StorageDevices_StorageDeviceId",
                table: "ComputerAssemblies",
                column: "StorageDeviceId",
                principalTable: "StorageDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComputerAssemblies_VideoCards_VideoCardId",
                table: "ComputerAssemblies",
                column: "VideoCardId",
                principalTable: "VideoCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ComputerAssemblies_ComputerAssemblyId",
                table: "Orders",
                column: "ComputerAssemblyId",
                principalTable: "ComputerAssemblies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
