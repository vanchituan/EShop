using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using EShop.Model.ViewModel.Admin.Product;

namespace EShop.Data.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        IEnumerable<Product> GetProductList(SearchingViewModel search);

        Product Create(Product product);
    }

    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<Product> GetProductList(SearchingViewModel search)
        {
            var model = search.IsHomePage ?
                (from a in DbContext.Products
                 where
                 (search.ProductName == null || a.Name.Contains(search.ProductName)) &&
                 (search.CategoryId == null || a.CategoryId == search.CategoryId)
                 select new
                 {
                     Name = a.Name,
                     OrderedDate = a.OrderedDate,
                     Price = a.Price,
                     PriceImport = a.PriceImport,
                     Warranty = a.Warranty,
                     Status = a.Status,
                     Unit = a.Unit,
                     CategoryId = a.CategoryId,
                     Id = a.Id,
                     ProductCategory = DbContext.ProductCategories.FirstOrDefault(m => m.Id == a.CategoryId)
                 }).AsEnumerable().
                         Select(m => new Product
                         {
                             Name = m.Name,
                             Id = m.Id,
                             OrderedDate = m.OrderedDate,
                             Price = m.Price,
                             PriceImport = m.PriceImport,
                             Unit = m.Unit,
                             Warranty = m.Warranty,
                             Status = m.Status,
                             CategoryId = m.CategoryId,
                             ProductCategory = m.ProductCategory
                         })
            :
            (from a in DbContext.Products
                         where
                         (search.ProductName == null || a.Name.Contains(search.ProductName)) &&
                         (search.CategoryId == null || a.CategoryId == search.CategoryId)
                         select new
                         {
                             Name = a.Name,
                             OrderedDate = a.OrderedDate,
                             Price = a.Price,
                             PriceImport = a.PriceImport,
                             Warranty = a.Warranty,
                             Status = a.Status,
                             Unit = a.Unit,
                             CategoryId = a.CategoryId,
                             Id = a.Id,
                             ProductCategory = DbContext.ProductCategories.FirstOrDefault(m => m.Id == a.CategoryId),
                             WarehouseDetails = (from w in DbContext.WarehouseDetails
                                                 where w.ProductId == a.Id
                                                 select new
                                                 {
                                                     Quantity = w.Quantity,
                                                     Warehouse = DbContext.Warehouses.FirstOrDefault(s => s.WarehouseId == w.WarehouseId)
                                                 }).AsEnumerable()
                         }).AsEnumerable().
                         Select(m => new Product
                         {
                             Name = m.Name,
                             Id = m.Id,
                             OrderedDate = m.OrderedDate,
                             Price = m.Price,
                             PriceImport = m.PriceImport,
                             Unit = m.Unit,
                             Warranty = m.Warranty,
                             Status = m.Status,
                             CategoryId = m.CategoryId,
                             ProductCategory = m.ProductCategory,
                             WarehouseDetails = m.WarehouseDetails.Select(n => new WarehouseDetail
                             {
                                 Quantity = n.Quantity,
                                 Warehouse = n.Warehouse
                             })
                         });

            search.TotalRow = model.Count();

            #region sort
            //if (search.SortBy)
            //{
            //    switch (search.OrderBy)
            //    {
            //        case "Name":
            //            model = model.OrderBy(m => m.Name);
            //            break;
            //        case "CategoryId":
            //            model = model.OrderBy(m => m.CategoryId);
            //            break;
            //        case "OrderedDate":
            //            model = model.OrderBy(m => m.OrderedDate);
            //            break;
            //        default:
            //            model = model.OrderBy(m => m.Id);
            //            break;
            //    }
            //}
            //else
            //{
            //    switch (search.OrderBy)
            //    {
            //        case "Name":
            //            model = model.OrderByDescending(m => m.Name);
            //            break;
            //        case "CategoryId":
            //            model = model.OrderByDescending(m => m.CategoryId);
            //            break;
            //        case "OrderedDate":
            //            model = model.OrderByDescending(m => m.OrderedDate);
            //            break;
            //        default:
            //            model = model.OrderByDescending(m => m.Id);
            //            break;
            //    }
            //}
            #endregion

            model = model.OrderByDescending(m => m.CreatedDate).Skip(search.Page * search.PageSize).Take(search.PageSize);

            return model;
        }

        public Product Create(Product product)
        {
            return null;
        }
    }
}
