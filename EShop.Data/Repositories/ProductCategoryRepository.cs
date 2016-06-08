using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;

namespace EShop.Data.Repositories
{

    public interface IProductCategoryRepository : IRepository<ProductCategory>
    {
        IEnumerable<ProductCategory> GetByAlias(string alias);

        IEnumerable<ProductCategory> GetByParentCategory(int id);


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
    }
}
