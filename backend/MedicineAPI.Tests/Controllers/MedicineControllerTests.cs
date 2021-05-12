using System;
using System.Collections.Generic;
using System.Net;
using MedicineAPI.Domain;
using MedicineAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace MedicineAPI.Tests
{
    public class MedicineControllerTests
    {
        Mock<IMedicineService> mockMedicineService;
        MedicineController medicineController;

        public MedicineControllerTests()
        {
            mockMedicineService = new Mock<IMedicineService>();
            medicineController = new MedicineController(mockMedicineService.Object);
        }

        [Fact]
        public void Get_Returns_OkObjectResult()
        {
            // Arrange
            mockMedicineService.Setup(service => service.GetMedicines()).Returns(this.GetListOfMedicines());

            // Act
            var result = this.medicineController.Get();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Post_Returns_Created_StatusCode_On_Success()
        {
            // Arrange
            string id;
            Medicine medicine = new Medicine
            {
                Id = string.Empty,
                Name = string.Empty,
                Brand = string.Empty,
                Price = 0.0m,
                Quantity = 0,
                ExpiryDate = new DateTime(year: 2022, month: 6, day: 2)
            };
            mockMedicineService.Setup(service => service.AddMedicine(medicine, out id)).Returns(true);

            // Act
            var result = this.medicineController.Post(medicine);

            // Assert
            Assert.IsType<ObjectResult>(result);
        }

        [Fact]
        public void Post_Returns_BadRequest_When_Invalid_Body_Supplied()
        {
            // Arrange
            string id;
            Medicine medicine = new Medicine
            {
                Id = "",
                Notes = ""
            };
            mockMedicineService.Setup(service => service.AddMedicine(medicine, out id)).Returns(false);
            medicineController.ModelState.AddModelError("Name", "Name is required");

            // Act
            var result = this.medicineController.Post(new Medicine());

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_Returns_BadRequest_When_Invalid_ExpiryDate_Supplied()
        {
            // Arrange
            string id;
            mockMedicineService.Setup(service => service.AddMedicine(new Medicine { ExpiryDate = DateTime.Now }, out id)).Returns(false);

            // Act
            var result = this.medicineController.Post(new Medicine());

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        private List<Medicine> GetListOfMedicines()
        {
            return new List<Medicine>()
                {
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Benadryl Syrup", Brand="Benadryl Syrup", Price=45.00m, Quantity=15, ExpiryDate=new DateTime(year: 2022, month: 8, day: 12), Notes="Used to treat cough"},
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Limcee", Brand="Abbott Health Care Pvt Ltd", Price=95.00m, Quantity=15, ExpiryDate=new DateTime(year: 2021, month: 11, day: 6), Notes="Limcee vitamin C 500mg"},
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Zerodol-P", Brand="Ipca Laboratories Pvt Ltd", Price=100.00m, Quantity=9, ExpiryDate=new DateTime(year: 2021, month: 12, day: 6), Notes=""},
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Azithromicin", Brand="Cipla", Price=130.50m, Quantity=40, ExpiryDate=new DateTime(year: 2022, month: 1, day: 23), Notes="Treats bacterial infection"},
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Arshomrit", Brand="Ajit Ayuvedia", Price=150.00m, Quantity=10, ExpiryDate=new DateTime(year: 2022, month: 8, day: 2), Notes=""},
                    new Medicine { Id=Guid.NewGuid().ToString(), Name="Duphalac soln", Brand="Solvay", Price=95.00m, Quantity=40, ExpiryDate=new DateTime(year: 2021, month: 5, day: 30), Notes="Ease in motion"}
                };
        }
    }
}
