using EShop.Web.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EShop.Service;
using EShop.Model.Models;
using EShop.Model.ViewModel.Admin.Product;

namespace EShop.Web.Api
{
    [RoutePrefix("api/product")]
    //[Authorize]
    public class ProductController : ApiControllerBase
    {
        private IProductService _productService;
        private IWarehouseDetailService _whDetailService;
        public ProductController(IErrorService errorService, IProductService productService, IWarehouseDetailService whDetailService) : base(errorService)
        {
            this._whDetailService = whDetailService;
            this._productService = productService;
        }

        [Route("getlist")]
        [HttpPost]
        public HttpResponseMessage GetProductList(HttpRequestMessage request, SearchingViewModel search)
        {
            return CreateHttpResponse(request, () =>
            {
                IEnumerable<Product> model = _productService.GetList(search);
                int totalRow = 0;
                totalRow = search.TotalRow;
                var paginationSet = new PaginationSet<Product>()
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


        [Route("getlistbycategory")]
        [HttpPost]
        public HttpResponseMessage GetListByCategory(HttpRequestMessage request, int categoryId)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    var model = this._productService.GetListByCategoryId(categoryId);
                    response = request.CreateResponse(HttpStatusCode.OK, model);
                }
                else
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                return response;
            });
        }

        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Add(HttpRequestMessage request, Product product)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    bool nameDuplicated = this._productService.CheckContain(product.Name);
                    if (nameDuplicated)
                    {
                        response = request.CreateResponse(HttpStatusCode.Conflict);
                    }
                    else
                    {
                        Product model = _productService.Add(product);
                        _productService.Save();

                        foreach (var item in product.WarehouseDetails)
                        {
                            WarehouseDetail whDetail = new WarehouseDetail();

                            whDetail.ProductId = model.Id;
                            whDetail.WarehouseId = item.WarehouseId;
                            whDetail.Quantity = item.Quantity;
                            _whDetailService.Add(whDetail);
                            _whDetailService.Save();
                        }
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
        public HttpResponseMessage Update(HttpRequestMessage request, Product product)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    bool nameDuplicated = this._productService.CheckContain(product.Name);
                    if (nameDuplicated)
                    {
                        response = request.CreateResponse(HttpStatusCode.Conflict);
                    }
                    else
                    {
                        this._productService.Update(product);
                        this._productService.Save();

                        foreach (var item in product.WarehouseDetails)
                        {
                            WarehouseDetail whDetail = this._whDetailService.GetByPairOfKey(item.ProductId, item.WarehouseId);
                            whDetail.Quantity = item.Quantity;
                            this._whDetailService.Update(whDetail);
                            this._whDetailService.Save();
                        }
                        response = request.CreateResponse(HttpStatusCode.OK, product);
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
