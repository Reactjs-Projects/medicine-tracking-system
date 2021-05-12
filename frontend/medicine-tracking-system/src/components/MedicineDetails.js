import React from "react";
import BackButton from "./Button/BackButton";

class MedicineDetails extends React.Component {
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
      originalNote: "",
      isChanged: false,
      isSuccess: false,
      isFormSubmitted: false,
    };
  }

  componentDidMount() {
    this.getMedicine();
  }

  getMedicine = async () => {
    const response = await fetch(
      `https://localhost:5003/api/medicines/read/${this.props.match.params.id}`
    );
    const data = await response.json();
    this.setState({ medicine: data, originalNote: data.notes });
  };

  updateMedicine = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.medicine.id,
        notes: this.state.medicine.notes,
      }),
    };
    const url = `https://localhost:5003/api/medicines/store/${this.state.medicine.id}`;
    await fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          this.setState({
            isSuccess: true,
            isFormSubmitted: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isSuccess: false,
          isFormSubmitted: true,
        });
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.updateMedicine();
    this.setState({ isChanged: false });
  };

  handleChange = (event) => {
    const originalNote = this.state.originalNote;
    const newNote = event.target.value;
    const medicine = this.state.medicine;
    medicine.notes = newNote;

    if (originalNote !== newNote) {
      this.setState({ medicine, isChanged: true });
    } else {
      this.setState({ medicine, isChanged: false });
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    const medicine = this.state.medicine;
    medicine.notes = this.state.originalNote;
    this.setState({ medicine, isChanged: false });
  };

  render() {
    const medicine = this.state.medicine;
    let classes = "btn ";
    classes += this.state.isChanged ? "btn-primary" : "btn-secondary";

    return (
      <section className="details">
        <div className="wrapper">
          <BackButton />
          <header>
            <h1>Details</h1>
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
                    readOnly
                    value={medicine.name}
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
                    readOnly
                    value={medicine.brand}
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
                    readOnly
                    value={medicine.quantity}
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
                    readOnly
                    value={medicine.price}
                  />
                </li>
                <li>
                  <label className="flex-item" htmlFor="expiryDate">
                    Expiry Date
                  </label>
                  <input
                    className="flex-item"
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    readOnly
                    value={medicine.expiryDate}
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
                    value={medicine.notes}
                    onChange={this.handleChange}
                  ></textarea>
                </li>
                <li>
                  <input className={classes} type="submit" value="Save" />
                  <input
                    className={classes}
                    type="reset"
                    value="Cancel"
                    onClick={this.handleCancel}
                  />
                </li>
              </ul>
            </form>
            <div
              className={
                this.state.isFormSubmitted ? "show-alert-box" : "hide-alert-box"
              }
            >
              <div
                className={`alert ${
                  this.state.isSuccess ? "alert-success" : "alert-failure" 
                }`}
              >
                {this.state.isSuccess
                  ? "Update successfully"
                  : "Update failed!"}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MedicineDetails;
