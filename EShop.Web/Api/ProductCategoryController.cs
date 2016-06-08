using AutoMapper;
using EShop.Model.Models;
using EShop.Service;
using EShop.Web.Infrastructure.Core;
using EShop.Web.Infrastructure.Extensions;
using EShop.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EShop.Web.Api
{
    [RoutePrefix("api/productcategory")]
    public class ProductCategoryController : ApiControllerBase
    {
        IProductCategoryService _productCategoryService;
        public ProductCategoryController(IErrorService errorService, IProductCategoryService productCategoryService)
            : base(errorService)
        {
            this._productCategoryService = productCategoryService;
        }


        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetAll();
                //var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(model);
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }



        [Route("getallparents")]
        [HttpGet]
        public HttpResponseMessage GetAllParents(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetAll();

                var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);
                return response;
            });
        }


        [Route("getbyid/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetById(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetById(id);

                var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);

                return response;
            });
        }

        [Route("x")]
        [HttpPost]
        public HttpResponseMessage x(HttpRequestMessage request, int valueInitForParentCategory)
        {
            return CreateHttpResponse(request, () =>
            {
                IEnumerable<ProductCategory> model = _productCategoryService.GetByParentCategory(valueInitForParentCategory);
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }


        [Route("create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ProductCategoryViewModel productCategoryVm)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var newProductCategory = new ProductCategory();
                    newProductCategory.UpdateProductCategory(productCategoryVm);

                    _productCategoryService.Add(newProductCategory);
                    _productCategoryService.Save();

                    var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(newProductCategory);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }


        [Route("update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Update(HttpRequestMessage request, ProductCategoryViewModel productCategoryVm)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var dbProductCategory = _productCategoryService.GetById(productCategoryVm.Id);

                    dbProductCategory.UpdateProductCategory(productCategoryVm);
                    dbProductCategory.UpdatedDate = DateTime.Now;

                    _productCategoryService.Update(dbProductCategory);
                    _productCategoryService.Save();

                    var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(dbProductCategory);
                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }


    }
}
