using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using EShop.Model.Models;
using EShop.Model.ViewModel.Admin.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Service
{
    public interface IProductService
    {
        IEnumerable<Product> GetProductList(SearchingViewModel search);

        Product GetById(int id);

        Product Add(Product product);

        void Update(Product product);

        Product Delete(int id);

        void Save();
        
    }
    public class ProductService : IProductService
    {
        IProductRepository _productRepository;
        IUnitOfWork _unitOfWork;
        public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork)
        {
            this._productRepository = productRepository;
            this._unitOfWork = unitOfWork;
        }

        public Product Add(Product product)
        {
            return _productRepository.Add(product);
        }

        public Product Delete(int id)
        {
            return _productRepository.Delete(id);
        }

        public Product GetById(int id)
        {
            return _productRepository.GetSingleByCondition(x => x.Id == id, new string[] { "ProductCategory" });
        }

        public IEnumerable<Product> GetProductList(SearchingViewModel search)
        {
            return _productRepository.GetProductList(search);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(Product product)
        {
            _productRepository.Update(product);
        }
    }
}
