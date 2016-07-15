namespace EShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFKforInvoice : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.InvoiceDetails", "InvoiceId");
            CreateIndex("dbo.InvoiceDetails", "ProductId");
            AddForeignKey("dbo.InvoiceDetails", "InvoiceId", "dbo.Invoices", "Id", cascadeDelete: true);
            AddForeignKey("dbo.InvoiceDetails", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.InvoiceDetails", "ProductId", "dbo.Products");
            DropForeignKey("dbo.InvoiceDetails", "InvoiceId", "dbo.Invoices");
            DropIndex("dbo.InvoiceDetails", new[] { "ProductId" });
            DropIndex("dbo.InvoiceDetails", new[] { "InvoiceId" });
        }
    }
}
