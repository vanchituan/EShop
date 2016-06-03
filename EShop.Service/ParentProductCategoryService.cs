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
    public interface IParentProductCategoryService
    {
        IEnumerable<ParentProductCategory> GetAll();

        ParentProductCategory Add();
        void Update();

        ParentProductCategory Delete(int id);

        ParentProductCategory GetById(int id);

        void Save();

    }


    public class ParentProductCategoryService : IParentProductCategoryService
    {
        IParentProductCategoryRepository _parentCategoryRepository;
        IUnitOfWork _unitOfWork;

        public ParentProductCategoryService(IParentProductCategoryRepository parentCategoryRepository, IUnitOfWork unitOfWork)
        {
            this._parentCategoryRepository = parentCategoryRepository;
            this._unitOfWork = unitOfWork;
        }

        public ParentProductCategory Add()
        {
            throw new NotImplementedException();
        }

        public ParentProductCategory Add(ParentProductCategory entity)
        {
            return _parentCategoryRepository.Add(entity);
        }

        public ParentProductCategory Delete(int id)
        {
            return _parentCategoryRepository.Delete(id);
        }

        public IEnumerable<ParentProductCategory> GetAll()
        {
            return _parentCategoryRepository.GetAll();
        }

        public ParentProductCategory GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Update()
        {
            throw new NotImplementedException();
        }
    }
}
