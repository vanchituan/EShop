using EShop.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EShop.Service;
using EShop.Model.Models;

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

        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Add(HttpRequestMessage request, ParentProductCategory entity)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    bool nameDuplicated = this._parentService.CheckContain(entity.ParentCategoryName);
                    if (nameDuplicated)
                    {
                        response = request.CreateResponse(HttpStatusCode.Conflict);
                    }
                    else
                    {
                        var model = this._parentService.Add(entity);
                        this._parentService.Save();
                        response = request.CreateResponse(HttpStatusCode.Created, model);
                    }
                }
                else
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                return response;
            });
        }
    }
}
