namespace EShop.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void Commit();
    }
}