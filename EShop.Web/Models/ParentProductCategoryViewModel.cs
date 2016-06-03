using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EShop.Web.Models
{
    public class ParentProductCategoryViewModel
    {
        public int ParentCategoryId { get; set; }

        public string ParentCategoryName { get; set; }

        public virtual IEnumerable<ProductCategoryViewModel> ProductCategories { get; set; }

    }
}