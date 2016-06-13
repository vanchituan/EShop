using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.Models
{
    [Table("Invoices")]
    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        public decimal Total { get; set; }

        public decimal Profit { get; set; }

        public DateTime CreatedDate { get; set; }

        public int CreatedBy { get; set; }

    }
}
