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
    [RoutePrefix("api/statistic")]
    [Authorize]
    public class StatisticController : ApiControllerBase
    {
        private IErrorService _errorService;
        private IStatisticService _statisticService;
        public StatisticController(IErrorService errorService, IStatisticService statisticService) 
            : base(errorService)
        {
            this._errorService = errorService;
            this._statisticService = statisticService;
        }

        [HttpGet]
        [Route("getrevenues")]
        public HttpResponseMessage GetStatistic(HttpRequestMessage request, DateTime? fromDate ,DateTime? toDate )
        {
            if (fromDate == null)
            {
                fromDate = DateTime.Now.AddMonths(-1).Date;
            }
            if (toDate == null)
            {
                toDate = DateTime.Now.AddDays(1).Date;
            }

            var model = this._statisticService.GetRevenue(fromDate.Value, toDate.Value);
            var response = request.CreateResponse(HttpStatusCode.OK, model);
            return response;
        }
    }
}
