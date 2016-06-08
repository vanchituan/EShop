using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.Models;
using EShop.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.UnitTest.ServiceTest
{
    [TestClass]
    public class WarehouseDetailServiceTest
    {
        private Mock<IWarehouseDetailRepository> _mockRepository;
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private IWarehouseDetailService _whDetailService;
        private List<WarehouseDetail> _whDetailList;

        [TestInitialize]
        public void Initialize()
        {
            this._mockRepository = new Mock<IWarehouseDetailRepository>();
            this._mockUnitOfWork = new Mock<IUnitOfWork>();
            this._whDetailService = new WarehouseDetailService(this._mockRepository.Object,this._mockUnitOfWork.Object);
            this._whDetailList = new List<WarehouseDetail>()
            {
                //new WarehouseDetail() {ProductId = }
            };

        }
    }
}
