using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        EShopDbContext db;
        public EShopDbContext Init()
        {
            return db ?? (db = new EShopDbContext());
        }

        protected override void DisposeCore()
        {
            if (db != null)
            {
                db.Dispose();
            }
        }
    }
}
