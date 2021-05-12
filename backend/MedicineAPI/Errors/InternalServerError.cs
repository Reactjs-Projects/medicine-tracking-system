using System.Net;

namespace MedicineAPI.Errors
{
    public class InternalServerError : Error
    {
        public InternalServerError()
        : base(500, HttpStatusCode.InternalServerError.ToString())
        {
        }

        public InternalServerError(string message)
        : base(500, HttpStatusCode.InternalServerError.ToString(), message)
        {
        }
    }    
}