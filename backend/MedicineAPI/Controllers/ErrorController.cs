using System.Net;
using MedicineAPI.Errors;
using Microsoft.AspNetCore.Mvc;

namespace MedicineAPI.Controllers
{
    [ApiController]
    [Route("errors")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController: ControllerBase
    {
        [Route("{code}")]
        public IActionResult Error(int code)
        {
            HttpStatusCode parsedCode = (HttpStatusCode)code;
            Error error = new Error(code, parsedCode.ToString());
            return new ObjectResult(error);
        }
    }
}