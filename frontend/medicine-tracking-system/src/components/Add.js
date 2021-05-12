import React from "react";
import BackButton from "./Button/BackButton";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: {
        id: "",
        name: "",
        brand: "",
        price: 0.0,
        quantity: 0,
        expiryDate: "",
        notes: "",
      },
      isFormValid: true,
      showSuccessOrFailureMsg: false,
      successMessage: "",
      errorMessage: "",
    };
  }

  resetMedicineState = () => {
    const medicine = {
      id: "",
      name: "",
      brand: "",
      price: 0.0,
      quantity: 0,
      expiryDate: "",
      notes: "",
    };
    this.setState({ medicine });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const medicine = this.state.medicine;

    if (this.performValidation()) {
      let isFormValid = true;
      let errorMessage = "";
      let successMessage = "";

      // Check for expiry.
      const daysRemaining = Math.ceil(
        (new Date(medicine.expiryDate).getTime() - Date.now()) /
          (1000 * 3600 * 24)
      );
      if (daysRemaining < 15) {
        isFormValid = false;
        errorMessage = "Medicines with expiry date less than 15 couldn't be added.";
        this.setState({ errorMessage, isFormValid });
      } else if (daysRemaining < 30) {
        isFormValid = true;
        successMessage = "Warning: Medicine will expiry within 30 days.";
      } else {
        isFormValid = true;
        successMessage = "Submitted successfully.";
      }

      if (isFormValid) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.state.medicine),
        };
        await fetch(
          "https://localhost:5003/api/medicines/store",
          requestOptions
        ).then((response) => {
          console.log(`response: ${response}`);
          console.log(`response code: ${response.status}`);
          console.log(`response.ok: ${response.ok}`);
          if (!response.ok) {
            this.setState({
              showSuccessOrFailureMsg: true,
              isFormValid: false,
              errorMessage,
            });
          } else {
            this.setState({
              showSuccessOrFailureMsg: true,
              isFormValid: true,
              successMessage,
            });
          }
        });

        this.resetMedicineState();
      }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let medicine = this.state.medicine;
    medicine[name] = value;
    this.setState({
      medicine: medicine,
    });
  };

  performValidation = () => {
    const { name, brand, price, quantity } = this.state.medicine;
    let errorMessage = "";
    let isFormValid = true;

    const nameRegex = /^[A-Za-z ]+$/;
    const priceRegex = /^[0-9]+(.[0-9]+)?$/;
    const quantityRegex = /^[0-9]+$/;

    if (!nameRegex.test(name)) {
      isFormValid = false;
      errorMessage = "Name: Only alphabets are allowed.";
    } else if (!nameRegex.test(brand)) {
      isFormValid = false;
      errorMessage = "Brand: Only alphabets are allowed.";
    } else if (!priceRegex.test(price)) {
      isFormValid = false;
      errorMessage = "Price: Only decimal numbers are allowed.";
    } else if (!quantityRegex.test(quantity)) {
      isFormValid = false;
      errorMessage = "Quantity: Only numbers are allowed.";
    }

    this.setState({ errorMessage, isFormValid, showSuccessOrFailureMsg: true });
    return isFormValid;
  };

  render() {
    return (
      <section className="add">
        <div className="wrapper">
          <BackButton />
          <header>
            <h1>Add Medicine</h1>
          </header>
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <ul>
                <li>
                  <label className="flex-item" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="flex-item"
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={this.state.medicine.name}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="brand">
                    Brand
                  </label>
                  <input
                    className="flex-item"
                    type="text"
                    name="brand"
                    id="brand"
                    required
                    value={this.state.medicine.brand}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    className="flex-item"
                    type="text"
                    name="quantity"
                    id="quantity"
                    required
                    pattern="[0-9]+"
                    value={this.state.medicine.quantity}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="flex-item"
                    type="text"
                    name="price"
                    id="price"
                    required
                    pattern="[0-9\.]+"
                    value={this.state.medicine.price}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    className="flex-item"
                    type="date"
                    name="expiryDate"
                    id="expiryDate"
                    required
                    value={this.state.medicine.expiryDate}
                    onChange={this.handleChange}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="notes">
                    Notes
                  </label>
                  <textarea
                    className="flex-item"
                    name="notes"
                    id="notes"
                    value={this.state.medicine.notes}
                    onChange={this.handleChange}
                  ></textarea>
                </li>
                <li>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Save"
                  />
                </li>
              </ul>
            </form>
            <div
              className={
                this.state.showSuccessOrFailureMsg
                  ? "show-alert-box"
                  : "hide-alert-box"
              }
            >
              <div
                className={`alert ${
                  this.state.isFormValid ? "alert-success" : "alert-failure"
                }`}
              >
                {this.state.showSuccessOrFailureMsg && this.state.isFormValid
                  ? this.state.successMessage
                  : this.state.errorMessage}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Add;
