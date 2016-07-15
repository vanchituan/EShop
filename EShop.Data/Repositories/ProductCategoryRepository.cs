using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using EShop.Model.ViewModel.Admin.ProductCategory;

namespace EShop.Data.Repositories
{

    public interface IProductCategoryRepository : IRepository<ProductCategory>
    {
        IEnumerable<ProductCategory> GetByAlias(string alias);

        IEnumerable<ProductCategory> GetByParentCategory(int id);

        IEnumerable<ProductCategory> GetList(SearchingViewModel searching);

    }
    public class ProductCategoryRepository : RepositoryBase<ProductCategory>, IProductCategoryRepository
    {
        public ProductCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<ProductCategory> GetByAlias(string alias)
        {
            return this.DbContext.ProductCategories.Where(q => q.Alias == alias);
        }

        public IEnumerable<ProductCategory> GetByParentCategory(int id)
        {
            return this.DbContext.ProductCategories.Where(q => q.ParentCategoryId == id);
        }

        public IEnumerable<ProductCategory> GetList(SearchingViewModel searching)
        {
            var model = (from a in this.DbContext.ProductCategories
                                                 select new
                                                 {
                                                     Id = a.Id,
                                                     Alias = a.Alias,
                                                     Name = a.Name,
                                                     Status = a.Status,
                                                     CreatedDate = a.CreatedDate,
                                                     ParentCategoryId = a.ParentCategoryId,
                                                     ParentProductCategory = DbContext.ParentProductCategories.FirstOrDefault(q => q.ParentCategoryId == a.ParentCategoryId)
                                                 })
                                                 .AsEnumerable().
                                             Select(m => new ProductCategory
                                             {
                                                 Id = m.Id,
                                                 Alias = m.Alias,
                                                 Name = m.Name,
                                                 Status = m.Status,
                                                 CreatedDate = m.CreatedDate,
                                                 ParentCategoryId = m.ParentCategoryId,
                                                 ParentProductCategory = m.ParentProductCategory
                                             });
            searching.TotalRow = model.Count();
            model = model.OrderByDescending(m=>m.Id).Skip(searching.Page * searching.PageSize).Take(searching.PageSize);
            return model;
        }
    }
}
