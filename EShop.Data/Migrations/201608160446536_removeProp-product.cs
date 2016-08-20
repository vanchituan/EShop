namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removePropproduct : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Products", "Image");
            DropColumn("dbo.Products", "MoreImages");
            DropColumn("dbo.Products", "PromotionPrice");
            DropColumn("dbo.Products", "Content");
            DropColumn("dbo.Products", "HomeFlag");
            DropColumn("dbo.Products", "HotFlag");
            DropColumn("dbo.Products", "ViewCount");
            DropColumn("dbo.ProductCategories", "DisplayOrder");
            DropColumn("dbo.ProductCategories", "Image");
            DropColumn("dbo.ProductCategories", "HomeFlag");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductCategories", "HomeFlag", c => c.Boolean());
            AddColumn("dbo.ProductCategories", "Image", c => c.String(maxLength: 256));
            AddColumn("dbo.ProductCategories", "DisplayOrder", c => c.Int());
            AddColumn("dbo.Products", "ViewCount", c => c.Int());
            AddColumn("dbo.Products", "HotFlag", c => c.Boolean());
            AddColumn("dbo.Products", "HomeFlag", c => c.Boolean());
            AddColumn("dbo.Products", "Content", c => c.String());
            AddColumn("dbo.Products", "PromotionPrice", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.Products", "MoreImages", c => c.String(storeType: "xml"));
            AddColumn("dbo.Products", "Image", c => c.String(maxLength: 256));
        }
    }
}
