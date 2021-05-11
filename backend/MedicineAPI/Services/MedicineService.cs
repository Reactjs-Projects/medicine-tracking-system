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

        public bool AddMedicine(Medicine medicine)
        {
            return collection.InsertOne(medicine);
        }

        public Medicine GetMedicine(string name)
        {
            Medicine medicine = collection
                            .AsQueryable()
                            .Where(item => item.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
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

        public bool UpdateMedicineNotes(string name, string note)
        {
            Medicine medicine = GetMedicine(name);
            if (medicine != null)
            {
                medicine.Notes = note;
                return collection.UpdateOne(
                    item => item.Name.Equals(medicine.Name, StringComparison.OrdinalIgnoreCase),
                    medicine);
            }
            return false;
        }
    }
}