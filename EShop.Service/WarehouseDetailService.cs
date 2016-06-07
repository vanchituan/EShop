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
    public interface IWarehouseDetailService
    {
        void Add(WarehouseDetail whDetail);
        void Save();

    }
    public class WarehouseDetailService : IWarehouseDetailService
    {
        IWarehouseDetailRepository _whRepository;
        IUnitOfWork _unitOfWork;

        public WarehouseDetailService(IWarehouseDetailRepository whRepository, IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._whRepository = whRepository;
        }

        public void Add(WarehouseDetail whDetail)
        {
            _whRepository.Add(whDetail);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}
