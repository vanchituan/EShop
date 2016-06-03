namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameIDandaddWH : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Menus", new[] { "GroupID" });
            DropIndex("dbo.OrderDetails", new[] { "OrderID" });
            DropIndex("dbo.OrderDetails", new[] { "ProductID" });
            DropIndex("dbo.Products", new[] { "CategoryID" });
            DropIndex("dbo.Posts", new[] { "CategoryID" });
            DropIndex("dbo.PostTags", new[] { "PostID" });
            DropIndex("dbo.PostTags", new[] { "TagID" });
            DropIndex("dbo.ProductTags", new[] { "ProductID" });
            DropIndex("dbo.ProductTags", new[] { "TagID" });
            CreateIndex("dbo.Menus", "GroupId");
            CreateIndex("dbo.OrderDetails", "OrderId");
            CreateIndex("dbo.OrderDetails", "ProductId");
            CreateIndex("dbo.Products", "CategoryId");
            CreateIndex("dbo.Posts", "CategoryId");
            CreateIndex("dbo.PostTags", "PostId");
            CreateIndex("dbo.PostTags", "TagId");
            CreateIndex("dbo.ProductTags", "ProductId");
            CreateIndex("dbo.ProductTags", "TagId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ProductTags", new[] { "TagId" });
            DropIndex("dbo.ProductTags", new[] { "ProductId" });
            DropIndex("dbo.PostTags", new[] { "TagId" });
            DropIndex("dbo.PostTags", new[] { "PostId" });
            DropIndex("dbo.Posts", new[] { "CategoryId" });
            DropIndex("dbo.Products", new[] { "CategoryId" });
            DropIndex("dbo.OrderDetails", new[] { "ProductId" });
            DropIndex("dbo.OrderDetails", new[] { "OrderId" });
            DropIndex("dbo.Menus", new[] { "GroupId" });
            CreateIndex("dbo.ProductTags", "TagID");
            CreateIndex("dbo.ProductTags", "ProductID");
            CreateIndex("dbo.PostTags", "TagID");
            CreateIndex("dbo.PostTags", "PostID");
            CreateIndex("dbo.Posts", "CategoryID");
            CreateIndex("dbo.Products", "CategoryID");
            CreateIndex("dbo.OrderDetails", "ProductID");
            CreateIndex("dbo.OrderDetails", "OrderID");
            CreateIndex("dbo.Menus", "GroupID");
        }
    }
}
