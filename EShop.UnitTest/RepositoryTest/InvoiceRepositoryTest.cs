using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.ViewModel.Admin.Invoice;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.UnitTest.RepositoryTest
{
    [TestClass]
    public class InvoiceRepositoryTest
    {
        private IDbFactory _dbFactory;
        private IUnitOfWork _unitOfWork;
        private IInvoiceRepository _invoiceRepository;

        [TestInitialize]
        public void Initialize()
        {
            _dbFactory = new DbFactory();
            _unitOfWork = new UnitOfWork(_dbFactory);
            _invoiceRepository = new InvoiceRepository(_dbFactory);
        }

        //[TestMethod]
        //public void Invoice_Repository_GetRevenueStatistic()
        //{
        //    var model =  this._invoiceRepository.GetRevenueStatistic();
        //    Assert.AreEqual(3, model.Count());
        //}
    }
}
