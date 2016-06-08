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
    public interface IProductCategoryService
    {
        ProductCategory Add(ProductCategory productCategory);
        void Update(ProductCategory productCategory);

        int Delete(int productCategoryId);

        IEnumerable<ProductCategory> GetAll();

        ProductCategory GetById(int id);

        IEnumerable<ProductCategory> GetByParentCategory(int id);

        void Save();
    }

    public class ProductCategoryService : IProductCategoryService
    {
        IUnitOfWork _unitOfWork;
        IProductCategoryRepository _productCategoryRepository;
        public ProductCategoryService(IUnitOfWork unitOfWork, IProductCategoryRepository productCategoryRepository)
        {
            this._unitOfWork = unitOfWork;
            this._productCategoryRepository = productCategoryRepository;
        }

        public IEnumerable<ProductCategory> GetAll()
        {
            return _productCategoryRepository.GetAll(new string[] { "ParentProductCategory"});
        }

        public ProductCategory GetById(int id)
        {
            return _productCategoryRepository.GetSingleByCondition(x => x.Id == id, new string[] { "ParentProductCategory" });
        }

        public int Delete(int productCategoryId)
        {
            throw new NotImplementedException();
        }

        public void Update(ProductCategory productCategory)
        {
            _productCategoryRepository.Update(productCategory);
        }

        public ProductCategory Add(ProductCategory productCategory)
        {
            return _productCategoryRepository.Add(productCategory);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public IEnumerable<ProductCategory> GetByParentCategory(int id)
        {
            return _productCategoryRepository.GetByParentCategory(id);
        }
    }
}
