using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.UnitTest.RepositoryTest
{
    [TestClass]
    public class PostCategoryRepositoryTest
    {
        IDbFactory _dbFactory;
        IUnitOfWork _unitOfWork;
        IPostCategoryRepository _objRepository;
        IProductRepository _productRepository;


        [TestInitialize]
        public void Initialize()
        {
            _dbFactory = new DbFactory();
            _unitOfWork = new UnitOfWork(_dbFactory);
            _objRepository = new PostCategoryRepository(_dbFactory);
            _productRepository = new ProductRepository(_dbFactory);

        }

        [TestMethod]
        public void PostCategory_Repository_GetAll()
        {
            var list = _objRepository.GetAll();
            Assert.AreEqual(5, list.Count());
        }

        [TestMethod]
        public void PostCategory_Repository_Create()
        {
            PostCategory category = new PostCategory
            {
                Name = "post category",
                Alias = "post-category",
                Status = true
            };

            var result = _objRepository.Add(category);
            _unitOfWork.Commit();
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Id);
        }

        //[TestMethod]
        //public void WarehouseDetail_Service_Add()
        //{
        //    Product product = new Product
        //    {
        //        Alias = "sieu-sac-thuoc-xin",
        //        Name = "Siêu Sắc Thuốc Xịn",
        //        Price = 120000,
        //        PriceImport = 180000,
        //        CategoryId = 4,
        //        CreatedDate = DateTime.Now,
        //        OrderedDate = DateTime.Now,
        //        Status = true,
        //        Warranty = 3,
        //        Unit = "Cái",

        //    };

        //    Product model = _productRepository.Add(product);
        //    _unitOfWork.Commit();

        //}
    }
}
