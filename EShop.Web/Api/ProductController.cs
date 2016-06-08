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
                IEnumerable<Product> model = search.IsHomePage ? _productService.GetAll() : _productService.GetProductList(search);
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

        [Route("getbycategory/{categoryId:int}")]
        [HttpPost]
        public HttpResponseMessage GetByCategory(HttpRequestMessage request, int categoryId)
        {
            return CreateHttpResponse(request, () =>
            {
                IEnumerable<Product> model = _productService.GetByCategory(categoryId);
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }


        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, Product product)
        {
            return CreateHttpResponse(request, () =>
            {
                Product model = _productService.Add(product);
                _productService.Save();

                WarehouseDetail whDetail = new WarehouseDetail
                {
                    ProductId = model.Id
                };

                foreach (var item in product.WarehouseDetails)
                {
                    whDetail.Quantity = item.Quantity;
                    whDetail.WarehouseId = item.WarehouseId;
                    _whDetailService.Add(whDetail);
                    _whDetailService.Save();
                }

                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, Product product)
        {
            return CreateHttpResponse(request, () =>
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
                var response = request.CreateResponse(HttpStatusCode.OK, product.Name);
                return response;
            });
        }




    }
}
