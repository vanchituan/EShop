namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpriceimport : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "PriceImport", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "PriceImport");
        }
    }
}
