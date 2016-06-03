using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Repositories
{
    public interface IWarehouseDetailRepository : IRepository<WarehouseDetail>
    {

    }
    public class WarehouseDetailRepository : RepositoryBase<WarehouseDetail>, IWarehouseDetailRepository
    {
        public WarehouseDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
