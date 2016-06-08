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
    public class PostCategoryServiceTest
    {
        private Mock<IPostCategoryRepository> _mockRepository;
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private IPostCategoryService _categoryService;
        private List<PostCategory> _listCategory;

        [TestInitialize]
        public void Initialize()
        {
            _mockRepository = new Mock<IPostCategoryRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _categoryService = new PostCategoryService(_mockRepository.Object, _mockUnitOfWork.Object);
            _listCategory = new List<PostCategory>
            {
                new PostCategory { Id = 1, Name ="mock1",Status =true},
            new PostCategory { Id = 2, Name = "mock 1a", Status = true },
            new PostCategory { Id = 3, Name = "mock 2", Status = true },
            new PostCategory { Id = 4, Name = "mock 3", Status = true },
            new PostCategory { Id = 5, Name = "mock 4", Status = true },
            new PostCategory { Id = 6, Name = "mock 5", Status = true }
            };
        }

        [TestMethod]
        public void PostCategory_Service_GetAll()
        {
            //S1 : set up method
            _mockRepository.Setup(m => m.GetAll(null)).Returns(_listCategory);
            //S2 : call action
            var result = _categoryService.GetAll() as List<PostCategory>;
            //S3 : compare
            Assert.IsNotNull(result);
            Assert.AreEqual(6, result.Count);

        }

        [TestMethod]
        public void PostCategory_Service_Create()
        {
            PostCategory category = new PostCategory();
            int id = 1;
            category.Name = "Test";
            category.Alias = "test";
            category.Status = true;

            _mockRepository.Setup(m => m.Add(category)).Returns((PostCategory p) =>
            {
                p.Id = 1;
                return p;
            });

            var result = _categoryService.Add(category);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
        }

    }
}
