using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.Models
{
    [Table("InvoiceDetails")]
    public class InvoiceDetail
    {
        [Key]
        [Column(Order = 1)]
        public int InvoiceId { get; set; }

        [Column(Order = 2)]
        [Key]
        public int ProductId { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [ForeignKey("InvoiceId")]
        public virtual Invoice Invoice { get; set; }

    }
}
