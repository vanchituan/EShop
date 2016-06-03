namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class othertable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ParentProductCategories",
                c => new
                    {
                        ParentCategoryId = c.Int(nullable: false, identity: true),
                        ParentCategoryName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ParentCategoryId);
            
            AddColumn("dbo.Orders", "Profit", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Products", "Unit", c => c.String());
            AddColumn("dbo.Products", "OrderedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.ProductCategories", "ParentCategoryId", c => c.Int());
            CreateIndex("dbo.ProductCategories", "ParentCategoryId");
            AddForeignKey("dbo.ProductCategories", "ParentCategoryId", "dbo.ParentProductCategories", "ParentCategoryId");
            DropColumn("dbo.ProductCategories", "ParentID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductCategories", "ParentID", c => c.Int());
            DropForeignKey("dbo.ProductCategories", "ParentCategoryId", "dbo.ParentProductCategories");
            DropIndex("dbo.ProductCategories", new[] { "ParentCategoryId" });
            DropColumn("dbo.ProductCategories", "ParentCategoryId");
            DropColumn("dbo.Products", "OrderedDate");
            DropColumn("dbo.Products", "Unit");
            DropColumn("dbo.Orders", "Profit");
            DropTable("dbo.ParentProductCategories");
        }
    }
}
