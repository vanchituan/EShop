namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialDB1 : DbMigration
    {
        public override void Up()
        {
            RenameTable("Footers", "Footersss");
        }
        
        public override void Down()
        {
            RenameTable("Footersss", "Footers");
        }
    }
}
