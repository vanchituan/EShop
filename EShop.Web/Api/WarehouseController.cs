using EShop.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EShop.Service;

namespace EShop.Web.Api
{
    [RoutePrefix("api/warehouse")]
    public class WarehouseController : ApiControllerBase
    {
        private IWarehouseService _warehouseService;
        public WarehouseController(IErrorService errorService, IWarehouseService warehouseService) : base(errorService)
        {
            this._warehouseService = warehouseService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _warehouseService.GetAll();
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }
    }
}
