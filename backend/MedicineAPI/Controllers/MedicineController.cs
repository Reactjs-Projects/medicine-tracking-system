using System;
using System.Dynamic;
using System.Net;
using System.Threading.Tasks;
using MedicineAPI.Domain;
using MedicineAPI.Errors;
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

        [HttpGet("read/{id}")]
        public ObjectResult Get(string id)
        {
            var medicine = medicineService.GetMedicine(id);
            if (medicine == null)
                return new NotFoundObjectResult(new NotFoundError("Resource not found"));
            return new OkObjectResult(medicine);
        }

        [HttpPost("store")]
        public ObjectResult Post([FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            if (!IsMedicineValid(medicine))
            {
                return new BadRequestObjectResult(new BadRequestError("Medicine with expiryDate less than 15 days couldn't be added."));
            }
            bool isCreated = medicineService.AddMedicine(medicine, out string id);
            return isCreated
                ? StatusCode(Convert.ToInt16(HttpStatusCode.Created), new { Id = id })
                : new ObjectResult(new InternalServerError());
        }

        [HttpPatch("store/{id}")]
        public IActionResult PatchUpdate(string id, [FromBody] MedicinePatchRequest medicine)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var _medicine = medicineService.GetMedicine(id);
            if (_medicine == null)
            {
                return new BadRequestObjectResult(new BadRequestError("Invalid medicine"));
            }
            medicineService.UpdateMedicineNotes(id, medicine.Notes);
            return new NoContentResult();
        }

        private bool IsMedicineValid(Medicine medicine)
        {
            TimeSpan timeDiff = medicine.ExpiryDate - DateTime.Now;
            return timeDiff.Days > 15;
        }
    }
}