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
        void Update(WarehouseDetail whDetail);

        void UpdateQuantityFromInvoice(int productId, int quantity);

        void Add(WarehouseDetail whDetail);

        WarehouseDetail GetByPairOfKey(int productId, int warehouseId);

        bool CheckOutOfStock(int productId);

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

        public void Update(WarehouseDetail whDetail)
        {
            _whRepository.Update(whDetail);
        }

        public void Add(WarehouseDetail whDetail)
        {
            this._whRepository.Add(whDetail);
        }

        public WarehouseDetail GetByPairOfKey(int productId, int warehouseId)
        {
            return this._whRepository.GetSingleByCondition(q => q.ProductId == productId && q.WarehouseId == warehouseId);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void UpdateQuantityFromInvoice(int productId, int quantity)
        {
            //because update quantity from shop, warehouseId is 1
            var productDetailCurrent = GetByPairOfKey(productId, 1);
            productDetailCurrent.Quantity -= quantity;
        }

        public bool CheckOutOfStock(int productId)
        {
            //because update quantity from shop, warehouseId is 1
            return GetByPairOfKey(productId, 1).Quantity == 0;
        }
    }
}
