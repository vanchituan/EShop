using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EShop.Model.Models;
using EShop.Service;
using EShop.Web.Infrastructure.Core;

namespace EShop.Web.Api
{
    [RoutePrefix("api/warehousedetail")]
    public class WarehouseDetailController : ApiControllerBase
    {
        private IWarehouseDetailService _whDetailService;
        private IProductService _productService;
        public WarehouseDetailController(IErrorService errorService, IWarehouseDetailService whDetailService, IProductService productService) : base(errorService)
        {
            this._whDetailService = whDetailService;
            this._productService = productService;
        }

        [Route("updatewarehouse")]
        [HttpPost]
        public HttpResponseMessage UpdateWarehouse(HttpRequestMessage request, IEnumerable<WarehouseDetail> entity )
        {
            return CreateHttpResponse(request, () =>
            {
                foreach (var item in entity)
                {
                    WarehouseDetail model = this._whDetailService.GetByPairOfKey(item.ProductId, item.WarehouseId);
                    model.Quantity += item.Quantity;
                    this._whDetailService.Update(model);
                    this._whDetailService.Save();
                }

                string name = this._productService.GetById(entity.First().ProductId).Name;
                var response = request.CreateResponse(HttpStatusCode.OK, name);
                return response;
            });
        }
    }
}
