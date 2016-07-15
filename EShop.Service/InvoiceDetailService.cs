using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public interface IInvoiceDetailService
    {
        void Save();

        void Add(InvoiceDetail invoiceDetail);
    }
    public class InvoiceDetailService : IInvoiceDetailService
    {
        private IUnitOfWork _unitOfWork;
        private IInvoiceDetailRepository _invoiceDetailRepository;
        public InvoiceDetailService(IInvoiceDetailRepository invoiceDetailRepository, IUnitOfWork unitOfWork)
        {
            this._invoiceDetailRepository = invoiceDetailRepository;
            this._unitOfWork = unitOfWork;
        }

        public void Save()
        {
            this._unitOfWork.Commit();
        }

        public void Add(InvoiceDetail invoiceDetail)
        {
            this._invoiceDetailRepository.Add(invoiceDetail);
        }
    }
}
