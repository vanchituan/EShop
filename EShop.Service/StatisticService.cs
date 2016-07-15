using EShop.Data.Repositories;
using EShop.Model.ViewModel.Admin.Invoice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public interface IStatisticService 
    {
        IEnumerable<RevenueStatisticViewModel> GetRevenue(DateTime fromDate, DateTime toDate);
    }
    public class StatisticService : IStatisticService
    {
        private IInvoiceRepository _invoiceRepository;
        public StatisticService(IInvoiceRepository invoiceRepository)
        {
            this._invoiceRepository = invoiceRepository;
        }

        public IEnumerable<RevenueStatisticViewModel> GetRevenue(DateTime fromDate, DateTime toDate)
        {
            return this._invoiceRepository.GetRevenueStatistic(fromDate, toDate);
        }
    }
}
