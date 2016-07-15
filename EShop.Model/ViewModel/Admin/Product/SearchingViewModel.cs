using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.ViewModel.Admin.Product
{
    public class SearchingViewModel : PaginationBase
    {
        public string ProductName { get; set; }

        public int? CategoryId { get; set; }

        public bool? Status { get; set; }
    }
}
