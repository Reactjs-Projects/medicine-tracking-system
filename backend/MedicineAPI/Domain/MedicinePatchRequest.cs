using System;
using System.ComponentModel.DataAnnotations;

namespace MedicineAPI.Domain
{
    public class MedicinePatchRequest
    {
        [Key]
        [Required]
        public string Id { get; set; }

        [Required]
        public string Notes { get; set; }
    }
}
