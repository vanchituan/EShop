using EShop.Data.Infrastructure;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Repositories
{
    public interface IFooterRepository
    {

    }

    public class FooterRepository : RepositoryBase<Footer>, IFooterRepository
    {

        public FooterRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

    }
}
