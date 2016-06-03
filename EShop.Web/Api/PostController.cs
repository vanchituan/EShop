
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EShop.Service;
using EShop.Data.Repositories;
using EShop.Web.Infrastructure.Core;
using AutoMapper;

namespace EShop.Web.Api
{
    [RoutePrefix("api/post")]
    public class PostController : ApiControllerBase
    {
        IPostService _postService;
        public PostController(IErrorService errorService, IPostService postService) : base(errorService)
        {
            this._postService = postService;
        }

        //[Route("getall")]
        //public HttpResponseMessage Get(HttpRequestMessage request)
        //{
        //    return CreateHttpResponse(request,()=> 
        //    {
        //        var listPost = _postService.GetAll();

        //        var listPostCategoryVm = Mapper.Map<List<PostCategoryViewModel>>(listCategory);

        //        HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPostCategoryVm);

        //        return response;
        //    });
        //}


    }
}
