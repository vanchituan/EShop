using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.Models
{
    [Table("WarehouseDetails")]
    public class WarehouseDetail
    {
        [Key]
        [Column(Order = 1)]
        public int WarehouseId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }


        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [ForeignKey("WarehouseId")]
        public virtual Warehouse Warehouse { get; set; }

    }
}
