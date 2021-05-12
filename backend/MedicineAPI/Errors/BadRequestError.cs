using System.Net;

namespace MedicineAPI.Errors
{
    public class BadRequestError : Error
    {
        public BadRequestError()
        : base(400, HttpStatusCode.BadRequest.ToString())
        {
        }

        public BadRequestError(string message)
        : base(400, HttpStatusCode.BadRequest.ToString(), message)
        {
        }
    }
}