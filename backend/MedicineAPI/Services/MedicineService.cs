using System;
using System.Collections.Generic;
using System.Linq;
using JsonFlatFileDataStore;
using MedicineAPI.Domain;

namespace MedicineAPI.Services
{
    public class MedicineService : IMedicineService
    {
        private IDocumentCollection<Medicine> collection;

        public MedicineService(DataStore dataStore)
        {
            collection = dataStore.GetCollection<Medicine>("medicines");
        }

        public bool AddMedicine(Medicine medicine, out string id)
        {
            medicine.Id = Guid.NewGuid().ToString();
            id = medicine.Id;
            return collection.InsertOne(medicine);
        }

        public Medicine GetMedicine(string id)
        {
            Medicine medicine = collection
                            .AsQueryable()
                            .Where(medicine => medicine.Id.Equals(id, StringComparison.OrdinalIgnoreCase))
                            .FirstOrDefault();
            return medicine;
        }

        public IEnumerable<Medicine> GetMedicines()
        {
            var listOfMedicines = collection
                                    .AsQueryable()
                                    .Select(item => item);
            return listOfMedicines;
        }

        public bool UpdateMedicineNotes(string id, string note)
        {
            Medicine medicine = GetMedicine(id);
            if (medicine != null)
            {
                medicine.Notes = note;
                return collection.UpdateOne(
                    item => item.Id.Equals(id, StringComparison.OrdinalIgnoreCase),
                    medicine);
            }
            return false;
        }
    }
}