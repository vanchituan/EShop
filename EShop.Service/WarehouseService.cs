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
    public interface IWarehouseService
    {
        IEnumerable<Warehouse> GetAll();

    }

    public class WarehouseService : IWarehouseService
    {
        IWarehouseRepository _warehouseRepository;
        IUnitOfWork _unitOfWork;
        public WarehouseService(IWarehouseRepository warehouseRepository, IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._warehouseRepository = warehouseRepository;
        }

        public IEnumerable<Warehouse> GetAll()
        {
            return _warehouseRepository.GetAll();
        }
    }
}
