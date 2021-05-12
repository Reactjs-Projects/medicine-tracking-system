# Backend

## Technical Requirements:
- Use .Net Core WebAPI.
- Store data in JSON.
- Dependency Injection.
- Unit test for add. Make use of mocking framework.

## Functional Requirements
- Way to get all the medicines available in the system.
- Search capability which can query on name of the medicine attribute.
- Wrong search criteria/no records in system should return "No Date Found - 404"
- Capability to add more medicines.
  - Medicine with expiry date less than 15 days should not be allowed to add in the stock.
  - Should give warning if expiry date is less than 30 days.
- Allow updating the notes attribute for a medicine.


## Endpoints
1. medicines
   - GET /medicines/read
     - returns all the medicines available in the system.
   - GET /medicines/read/<medicine_name>
     - returns the specific medicine data if found in the system.
     - return 404 in case of wrong search criteria or no records.
   - POST /medicines/store
     - Add medicine if the expiry date is more than 30 days.
     - Add medicine if the expiry date is less than 30 days. In such case, the client site validation should give warning.
     - Do not allow to add medicine if the expiry date is less than 15 days. The client site validation must ensure that proper error message is supplied and shouldn't allow to add the medicine.
   - PATCH /medicines/store/<medicine_name>
     - Allow updating on notes of a medicine.
