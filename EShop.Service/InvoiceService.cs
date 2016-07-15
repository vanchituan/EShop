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
    public interface IInvoiceService
    {
        Invoice Add(Invoice invoice);

        IEnumerable<Invoice> GetAll();

        void Save();
    }

    public class InvoiceService : IInvoiceService
    {
        private IUnitOfWork _unitOfWork;
        private IInvoiceRepository _invoiceRepository;
        public InvoiceService(IInvoiceRepository invoiceRepository, IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._invoiceRepository = invoiceRepository;
        }

        public Invoice Add(Invoice invoice)
        {
            return this._invoiceRepository.Add(invoice);
        }

        public IEnumerable<Invoice> GetAll()
        {
            return this._invoiceRepository.GetAll();
        }

        public void Save()
        {
            this._unitOfWork.Commit();
        }
    }
}
