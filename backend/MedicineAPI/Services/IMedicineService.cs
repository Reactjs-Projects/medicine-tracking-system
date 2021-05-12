using System;
using System.Collections.Generic;
using MedicineAPI.Domain;

namespace MedicineAPI.Services
{
    public interface IMedicineService
    {
        IEnumerable<Medicine> GetMedicines();
        Medicine GetMedicine(string id);
        bool AddMedicine(Medicine medicine, out string id);
        bool UpdateMedicineNotes(string id, string note);
    }
}