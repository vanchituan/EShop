using EShop.Model.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data
{
    public class EShopDbContext : IdentityDbContext<ApplicationUser>
    {
        public EShopDbContext() : base("EShopConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Footer> Footers { set; get; }

        public DbSet<Menu> Menus { set; get; }

        public DbSet<MenuGroup> MenuGroups { set; get; }

        public DbSet<Order> Orders { set; get; }

        public DbSet<OrderDetail> OrderDetails { set; get; }

        public DbSet<Page> Pages { set; get; }

        public DbSet<Post> Posts { set; get; }

        public DbSet<PostCategory> PostCategories { set; get; }

        public DbSet<PostTag> PostTags { set; get; }

        public DbSet<Product> Products { set; get; }

        public DbSet<ProductCategory> ProductCategories { set; get; }

        public DbSet<ProductTag> ProductTags { set; get; }

        public DbSet<Slide> Slides { set; get; }

        public DbSet<SupportOnline> SupportOnlines { set; get; }

        public DbSet<SystemConfig> SystemConfigs { set; get; }

        public DbSet<Tag> Tags { set; get; }

        public DbSet<VisitorStatistic> VisitorStatistics { set; get; }

        public DbSet<Error> Errors { set; get; }

        public DbSet<ParentProductCategory> ParentProductCategories { set; get; }

        public DbSet<Warehouse> Warehouses { set; get; }

        public DbSet<WarehouseDetail> WarehouseDetails{ set; get; }

        //public DbSet<Invoice> Invoices { set; get; }

        //public DbSet<InvoiceDetail> InvoiceDetails { set; get; }

        public static EShopDbContext Create()
        {
            return new EShopDbContext();
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole>().HasKey(i => new { i.UserId, i.RoleId });
            modelBuilder.Entity<IdentityUserLogin>().HasKey(i => i.UserId);
        }
    }
}
