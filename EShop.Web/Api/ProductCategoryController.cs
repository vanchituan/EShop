using AutoMapper;
using EShop.Model.Models;
using EShop.Model.ViewModel.Admin.ProductCategory;
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
    //[Authorize]
    public class ProductCategoryController : ApiControllerBase
    {
        private IProductCategoryService _productCategoryService;
        private IParentProductCategoryService _parentCategoryService;
        public ProductCategoryController(
            IErrorService errorService,
            IProductCategoryService productCategoryService,
            IParentProductCategoryService parentCategoryService)
            : base(errorService)
        {
            this._productCategoryService = productCategoryService;
            this._parentCategoryService = parentCategoryService;
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetAll();

                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("getlist")]
        [HttpPost]
        public HttpResponseMessage GetList(HttpRequestMessage request, SearchingViewModel search)
        {
            return CreateHttpResponse(request, () =>
            {
                IEnumerable<ProductCategory> model = _productCategoryService.GetList(search);
                int totalRow = 0;
                totalRow = search.TotalRow;
                var paginationSet = new PaginationSet<ProductCategory>()
                {
                    Items = model,
                    Page = search.Page,
                    TotalCount = totalRow,
                    TotalPages = (int)Math.Ceiling((decimal)totalRow / search.PageSize)
                };
                var response = request.CreateResponse(HttpStatusCode.OK, paginationSet);
                return response;
            });
        }



        [Route("getallparents")]
        [HttpGet]
        public HttpResponseMessage GetAllParents(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _parentCategoryService.GetAll();

                //var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("getbyparent/{parentCategory:int}")]
        [HttpPost]
        public HttpResponseMessage GetByParent(HttpRequestMessage request, int parentCategory)
        {
            return CreateHttpResponse(request, () =>
            {

                IEnumerable<ProductCategory> model = _productCategoryService.GetByParentCategory(parentCategory);
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }


        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Add(HttpRequestMessage request, ProductCategory category)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    bool nameDuplicated = this._productCategoryService.CheckContain(category.Name);
                    if (nameDuplicated)
                    {
                        response = request.CreateResponse(HttpStatusCode.Conflict);
                    }
                    else
                    {
                        var model = _productCategoryService.Add(category);
                        _productCategoryService.Save();
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


        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, ProductCategory category)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    bool nameDuplicated = this._productCategoryService.CheckContain(category.Name);
                    if (nameDuplicated)
                    {
                        response = request.CreateResponse(HttpStatusCode.Conflict, "Trùng tên loại sản phẩm");
                    }
                    else
                    {
                        _productCategoryService.Update(category);
                        _productCategoryService.Save();

                        response = request.CreateResponse(HttpStatusCode.OK, category);
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
