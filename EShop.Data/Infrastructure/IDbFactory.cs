using System;

namespace EShop.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        EShopDbContext Init();//init dbcontext;
    }
}