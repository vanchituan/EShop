namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class readdWH : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WarehouseDetails",
                c => new
                    {
                        WarehouseId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.WarehouseId, t.ProductId })
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Warehouses", t => t.WarehouseId, cascadeDelete: true)
                .Index(t => t.WarehouseId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Warehouses",
                c => new
                    {
                        WarehouseId = c.Int(nullable: false, identity: true),
                        WarehouseName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.WarehouseId);

            //RenameColumn("dbo.Footers", "ID", "Id");
            RenameTable("Footers", "Footersss");

        }
        
        public override void Down()
        {
            DropForeignKey("dbo.WarehouseDetails", "WarehouseId", "dbo.Warehouses");
            DropForeignKey("dbo.WarehouseDetails", "ProductId", "dbo.Products");
            DropIndex("dbo.WarehouseDetails", new[] { "ProductId" });
            DropIndex("dbo.WarehouseDetails", new[] { "WarehouseId" });
            DropTable("dbo.Warehouses");
            DropTable("dbo.WarehouseDetails");
            RenameTable("Footersss", "Footers");
        }
    }
}
