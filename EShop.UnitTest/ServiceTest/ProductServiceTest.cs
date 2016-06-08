using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.Models;
using EShop.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;


namespace EShop.UnitTest.ServiceTest
{
    [TestClass]
    public class ProductServiceTest
    {
        private Mock<IProductRepository> _mockRepository;
        private Mock<IUnitOfWork> _mockUnitMock;
        private IProductService _productService;
        private Product _product;

        [TestInitialize]
        public void Inititalize()
        {
            this._mockRepository = new Mock<IProductRepository>();
            this._mockUnitMock = new Mock<IUnitOfWork>();
            this._productService = new ProductService(this._mockRepository.Object, this._mockUnitMock.Object);
            this._product = new Product()
            {
                Alias = "sieu-thuoc-tot",
                CategoryId =  4,
                CreatedDate = DateTime.Now,
                Name = "Siêu Thuốc Tốt",
                OrderedDate =  DateTime.Now,
                Price = 180000,
                PriceImport = 120000,
                Status =  true,
                Warranty = 3,
                Unit = "Cái",
            };

        }

        [TestMethod]
        public void Product_Service_Test()
        {

        }
    }
}
