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
    [RoutePrefix("api/invoice")]
    //[Authorize]
    public class InvoiceController : ApiControllerBase
    {
        private IErrorService _errorService;
        private IInvoiceService _invoiceService;
        private IInvoiceDetailService _invoiceDetailService;
        private IWarehouseDetailService _warehouseDetailService;
        public InvoiceController(IErrorService errorService,
            IInvoiceService invoiceService,
            IInvoiceDetailService invoiceDetailService,
            IWarehouseDetailService warehouseDetailService
            )
            : base(errorService)
        {
            this._errorService = errorService;
            this._invoiceService = invoiceService;
            this._invoiceDetailService = invoiceDetailService;
            this._warehouseDetailService = warehouseDetailService;
        }

        [HttpPost]
        [Route("add")]
        public HttpResponseMessage Add(HttpRequestMessage request, Invoice invoice)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    //check out of stock
                    bool frmInvoiceDetailIsValid = true;
                    foreach (var item in invoice.InvoiceDetails)
                    {
                        if (this._warehouseDetailService.CheckOutOfStock(item.ProductId))
                        {
                            frmInvoiceDetailIsValid = false;
                        }
                    }

                    if (frmInvoiceDetailIsValid)
                    {
                        Invoice currentInvoice = _invoiceService.Add(invoice);
                        _invoiceService.Save();

                        foreach (var item in invoice.InvoiceDetails)
                        {
                            InvoiceDetail invoiceDetail = new InvoiceDetail
                            {
                                InvoiceId = currentInvoice.Id,
                                Price = item.Price,
                                ProductId = item.ProductId,
                                Quantity = item.Quantity
                            };
                            this._invoiceDetailService.Add(invoiceDetail);
                            this._invoiceDetailService.Save();

                            this._warehouseDetailService.UpdateQuantityFromInvoice(item.ProductId, item.Quantity);
                            this._warehouseDetailService.Save();

                        }

                        response = request.CreateResponse(HttpStatusCode.Created);
                    }
                    else
                    {
                        response = request.CreateResponse(HttpStatusCode.BadRequest,"Có sản phẩm trong hóa đơn hết hàng");
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
