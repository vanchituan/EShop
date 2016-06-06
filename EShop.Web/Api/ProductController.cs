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
        public ProductController(IErrorService errorService, IProductService productService) : base(errorService)
        {
            this._productService = productService;
        }

        [Route("getlist")]
        [HttpPost]
        public HttpResponseMessage GetProductList(HttpRequestMessage request, SearchingViewModel search)
        {
            return CreateHttpResponse(request, () =>
            {
                IEnumerable<Product> model;
                if (search.IsHomePage) // custom order
                {
                    model = _productService.GetAll();
                }
                else // product management
                {
                    model = _productService.GetProductList(search);
                }
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



        [Route("add")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, Product product)
        {
            return CreateHttpResponse(request, () => 
            {
                var model = _productService.Add(product);
                var response = request.CreateResponse(HttpStatusCode.OK, model);
                return response;
            });
        }


    }
}
