namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modifycreatedby : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Invoices", "CreatedBy", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Invoices", "CreatedBy", c => c.Int(nullable: false));
        }
    }
}
