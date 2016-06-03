using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EShop.Web.Models
{
    public class ProductTagViewModel
    {
        public int ProductId { set; get; }

        public string TagId { set; get; }

        public virtual ProductViewModel Post { set; get; }

        public virtual TagViewModel Tag { set; get; }
    }
}