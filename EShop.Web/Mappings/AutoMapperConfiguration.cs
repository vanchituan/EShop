using AutoMapper;
using EShop.Model.Models;
using EShop.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EShop.Web.Mappings
{
    public class AutoMapperConfiguration
    {
        public static void ConFigure()
        {
            Mapper.CreateMap<Post, PostViewModel>();
            Mapper.CreateMap<Tag, TagViewModel>();
            Mapper.CreateMap<PostCategory, PostCategoryViewModel>();
            Mapper.CreateMap<ProductCategory, ProductCategoryViewModel>();
            Mapper.CreateMap<Product, ProductViewModel>();
            Mapper.CreateMap<ProductTag, ProductTagViewModel>();
            Mapper.CreateMap<ParentProductCategory, ParentProductCategoryViewModel>();
        }
    }
}