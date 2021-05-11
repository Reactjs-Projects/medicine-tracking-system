using System;
using System.ComponentModel.DataAnnotations;

namespace MedicineAPI.Domain
{
    public class Medicine
    {
        [Required]
        [Key]
        public string Name { get; set; }

        [Required]
        public string Brand { get; set; }
        
        [Required]
        public decimal Price { get; set; }
        
        [Required]
        public uint Quantity { get; set; }
        
        [Required]
        public DateTime ExpiryDate { get; set; }
        
        public string Notes { get; set; }
    }
}
