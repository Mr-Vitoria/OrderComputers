using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace admin_panel_react.Migrations
{
    /// <inheritdoc />
    public partial class AddUserImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Users");
        }
    }
}
