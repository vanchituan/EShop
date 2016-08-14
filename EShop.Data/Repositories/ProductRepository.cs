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
        IEnumerable<Product> GetList(SearchingViewModel search);

        IEnumerable<Product> GetListByCategoryId(int categoryId);

        Product GetRelatedById(int id);
    }

    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<Product> GetList(SearchingViewModel search)
        {
            var model = (from a in DbContext.Products
                         where
                         (search.ProductName == null || a.Name.Contains(search.ProductName)) &&
                         (search.CategoryId == null || a.CategoryId == search.CategoryId) &&
                         (search.Status == null || a.Status == search.Status)
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
                             Alias = a.Alias,
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
                          Alias = m.Alias,
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
            if (search.SortBy.Value)
            {
                switch (search.OrderBy)
                {
                    case "Name":
                        model = model.OrderBy(m => m.Name);
                        break;
                    case "CategoryId":
                        model = model.OrderBy(m => m.CategoryId);
                        break;
                    case "OrderedDate":
                        model = model.OrderBy(m => m.OrderedDate);
                        break;
                    case "Price":
                        model = model.OrderBy(m => m.Price);
                        break;
                    case "PriceImport":
                        model = model.OrderBy(m => m.PriceImport);
                        break;
                    default:
                        model = model.OrderBy(m => m.Id);
                        break;
                }
            }
            else
            {
                switch (search.OrderBy)
                {
                    case "Name":
                        model = model.OrderByDescending(m => m.Name);
                        break;
                    case "CategoryId":
                        model = model.OrderByDescending(m => m.CategoryId);
                        break;
                    case "OrderedDate":
                        model = model.OrderByDescending(m => m.OrderedDate);
                        break;
                    case "Price":
                        model = model.OrderByDescending(m => m.Price);
                        break;
                    case "PriceImport":
                        model = model.OrderByDescending(m => m.PriceImport);
                        break;

                    default:
                        model = model.OrderByDescending(m => m.Id);
                        break;
                }
            }
            #endregion

            model = model.OrderByDescending(m => m.CreatedDate).Skip((search.Page - 1)  * search.PageSize).Take(search.PageSize);

            return model;
        }


        /// <summary>
        /// for select2 input so not take and skip operator
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public IEnumerable<Product> GetListByCategoryId(int categoryId)
        {
            var model = (from a in DbContext.Products
                         where a.CategoryId == categoryId && a.Status == true
                         select new
                         {
                             Id = a.Id,
                             Name = a.Name,
                             Price = a.Price,
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
                          Id = m.Id,
                          Name = m.Name,
                          Price = m.Price,
                          WarehouseDetails = m.WarehouseDetails.Select(n => new WarehouseDetail
                          {
                              Quantity = n.Quantity,
                              Warehouse = n.Warehouse
                          })
                      });

            model = model.OrderBy(p => p.Name);

            return model;
        }

        public Product GetRelatedById(int id)
        {
            var model = (from a in DbContext.Products
                         where a.Id == id && a.Status == true
                         select new
                         {
                             Id = a.Id,
                             Name = a.Name,
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
                          Id = m.Id,
                          Name = m.Name,
                          ProductCategory = m.ProductCategory,
                          WarehouseDetails = m.WarehouseDetails.Select(n => new WarehouseDetail
                          {
                              Quantity = n.Quantity,
                              Warehouse = n.Warehouse
                          })
                      }).FirstOrDefault();

            return model;
        }
    }
}
