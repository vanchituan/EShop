using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.ViewModel.Admin
{
    public class PaginationBase
    {
        public int TotalRow { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public string OrderBy { get; set; }

        public bool? SortBy { get; set; }
    }
}
