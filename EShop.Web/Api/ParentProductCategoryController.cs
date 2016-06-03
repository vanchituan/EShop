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
    [RoutePrefix("api/parentcategory")]
    public class ParentProductCategoryController : ApiControllerBase
    {
        IParentProductCategoryService _parentService;
        public ParentProductCategoryController(IErrorService errorService, IParentProductCategoryService parentService) : base(errorService)
        {
            this._parentService = parentService;
        }


        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () => 
            {
                var model = _parentService.GetAll();
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }
    }
}
