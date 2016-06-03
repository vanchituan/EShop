using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Model.Models
{
    [Table("ParentProductCategories")]
    public class ParentProductCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ParentCategoryId { get; set; }

        [Required]
        public string ParentCategoryName { get; set; }

        public virtual IEnumerable<ProductCategory> ProductCategories { get; set; }

    }
}
