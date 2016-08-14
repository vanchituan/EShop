using EShop.Data.Infrastructure;
using EShop.Model.Models;
using EShop.Model.ViewModel.Admin.Invoice;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Data.Repositories
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        IEnumerable<RevenueStatisticViewModel> GetRevenueStatistic(DateTime fromDate, DateTime toDate);
    }
    public class InvoiceRepository : RepositoryBase<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<RevenueStatisticViewModel> GetRevenueStatistic(DateTime fromDate, DateTime toDate)
        {
            var model = (from a in this.DbContext.Invoices
                         where a.CreatedDate >= fromDate &&
                         a.CreatedDate <= toDate
                         group a by new
                         {
                             date = EntityFunctions.TruncateTime(a.CreatedDate).Value
                         } into g
                         select new 
                         {
                             Date = g.Key.date,
                             Total = g.Sum(x => x.Total),
                             Profit = g.Sum(x => x.Profit)
                         }).AsEnumerable().
                        Select(x => new RevenueStatisticViewModel
                        {
                            Date = x.Date,
                            Profit = x.Profit,
                            Total = x.Total
                        });

            return model;
        }
    }
}
