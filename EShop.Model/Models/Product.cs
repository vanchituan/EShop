using EShop.Model.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace EShop.Model.Models
{
    [Table("Products")]
    public class Product : Auditable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [Required]
        [MaxLength(256)]
        public string Name { set; get; }

        [Required]
        [MaxLength(256)]
        public string Alias { set; get; }

        [Required]
        public int CategoryId { set; get; }

        public decimal Price { set; get; }

        public decimal PriceImport { get; set; }

        public string Unit { get; set; }

        public DateTime OrderedDate{ get; set; }

        public int? Warranty { set; get; }

        [MaxLength(500)]
        public string Description { set; get; }

        [ForeignKey("CategoryId")]
        public virtual ProductCategory ProductCategory { set; get; }

        public virtual IEnumerable<WarehouseDetail> WarehouseDetails{ get; set; }
    }
}