using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Repositories
{
    public interface IParentProductCategoryRepository : IRepository<ParentProductCategory>
    {

    }


    public class ParentProductCategoryRepository : RepositoryBase<ParentProductCategory>, IParentProductCategoryRepository
    {
        public ParentProductCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
