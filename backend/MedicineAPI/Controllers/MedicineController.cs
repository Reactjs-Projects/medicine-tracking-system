using System;
using System.Net;
using System.Threading.Tasks;
using MedicineAPI.Domain;
using MedicineAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicineAPI
{
    [ApiController]
    [Route("api/medicines")]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineService medicineService;

        public MedicineController(IMedicineService medicineService)
        {
            this.medicineService = medicineService;
        }

        [HttpGet("read")]
        public ObjectResult Get()
        {
            return new OkObjectResult(medicineService.GetMedicines());
        }

        [HttpGet("read/{name}")]
        public ObjectResult Get(string name)
        {
            var medicine = medicineService.GetMedicine(name);
            if (medicine == null)
                return new NotFoundObjectResult("No data found.");
            return new OkObjectResult(medicine);
        }

        [HttpPost("store")]
        public ObjectResult Post([FromBody] Medicine medicine)
        {
            if (!IsMedicineValid(medicine))
            {
                return new BadRequestObjectResult("Internal Server Error");
            }
            bool isCreated = medicineService.AddMedicine(medicine);
            return isCreated ? Created("", "{}") : new BadRequestObjectResult("Internal Server Error");
        }

        [HttpPatch("store/{name}")]
        public ObjectResult Update(string name, [FromBody] Medicine medicine)
        {
            var _medicine = medicineService.GetMedicine(name);
            if (_medicine == null)
            {
                return new BadRequestObjectResult($"Invalid medicine");
            }
            medicineService.UpdateMedicineNotes(name, medicine.Notes);
            return new OkObjectResult("{}");
        }

        private bool IsMedicineValid(Medicine medicine)
        {
            TimeSpan timeDiff = medicine.ExpiryDate - DateTime.Now;
            return timeDiff.Days > 15;
        }
    }
}