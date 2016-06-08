using EShop.Data.Infrastructure;
using EShop.Data.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.UnitTest.RepositoryTest
{
    [TestClass]
    public class WarehouseDetailRepositoryTest
    {
        IDbFactory _dbFactory;
        IUnitOfWork _unitOfWork;
        IWarehouseDetailRepository _whDetailRepository;

        [TestInitialize]
        public void Initialize()
        {
            this._dbFactory = new DbFactory();
            this._unitOfWork = new UnitOfWork(this._dbFactory);
            this._whDetailRepository = new WarehouseDetailRepository(this._dbFactory);
        }

        [TestMethod]
        public void WarehouseDetail_Repository_Add()
        {

        }
    }
}
