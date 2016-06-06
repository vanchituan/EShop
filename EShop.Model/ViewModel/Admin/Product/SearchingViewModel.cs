using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.ViewModel.Admin.Product
{
    public class SearchingViewModel
    {
        public string ProductName { get; set; }

        public int? CategoryId { get; set; }

        public int TotalRow { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public bool IsHomePage { get; set; }

        //public string OrderBy { get; set; }

        //public bool? SortBy { get; set; }
    }
}
