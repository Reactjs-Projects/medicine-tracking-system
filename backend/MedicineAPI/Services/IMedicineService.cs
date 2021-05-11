using System.Collections.Generic;
using MedicineAPI.Domain;

namespace MedicineAPI.Services
{
    public interface IMedicineService
    {
        IEnumerable<Medicine> GetMedicines();
        Medicine GetMedicine(string name);
        bool AddMedicine(Medicine medicine);
        bool UpdateMedicineNotes(string name, string note);
    }
}