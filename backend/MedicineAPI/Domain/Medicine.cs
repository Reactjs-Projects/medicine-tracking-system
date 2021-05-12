using System;
using System.ComponentModel.DataAnnotations;

namespace MedicineAPI.Domain
{
    public class Medicine
    {
        [Key]
        public string Id { get; set; }
        
        [Required]
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
