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

        ParentProductCategory Add(ParentProductCategory entity);
        void Update();

        bool CheckContain(string name);

        ParentProductCategory Delete(int id);

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


        public ParentProductCategory Add(ParentProductCategory entity)
        {
            return _parentCategoryRepository.Add(entity);
        }

        public bool CheckContain(string name)
        {
            return this._parentCategoryRepository.CheckContains(q => q.ParentCategoryName == name);
        }

        public ParentProductCategory Delete(int id)
        {
            return _parentCategoryRepository.Delete(id);
        }

        public IEnumerable<ParentProductCategory> GetAll()
        {
            return _parentCategoryRepository.GetAll();
        }

        public void Save()
        {
            this._unitOfWork.Commit();
        }

        public void Update()
        {
            throw new NotImplementedException();
        }
    }
}
