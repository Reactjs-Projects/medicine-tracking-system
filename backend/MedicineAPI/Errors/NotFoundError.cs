using System.Net;

namespace MedicineAPI.Errors
{
    public class NotFoundError : Error
    {
        public NotFoundError()
        : base(404, HttpStatusCode.NotFound.ToString())
        {
        }

        public NotFoundError(string message)
        : base(404, HttpStatusCode.NotFound.ToString(), message)
        {
        }
    }
}