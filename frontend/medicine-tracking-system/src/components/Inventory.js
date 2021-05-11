import React from "react";
import { Link } from "react-router-dom";
import AddButton from "./Button/AddButton";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
  }

  componentDidMount() {
    this.getStock();
  }

  getStock = async () => {
    const data = await fetch("https://localhost:5003/api/medicines/read");
    const items = await data.json();
    this.setState({ stocks: items });
  };

  getTotalPrice = () => {
    let totalPrice = 0.0;
    this.state.stocks.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  getTotalQuantity = () => {
    let totalQuantity = 0;
    this.state.stocks.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  getExpiryDateAsLocalString = (expiryDate) => {
    let date = new Date(expiryDate);
    console.log(date.toLocaleString());
    return date.toLocaleDateString();
  };

  getFormattedItem = (item, index) => {
    let classes = "";
    const daysRemaining = Math.ceil(
      (new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 3600 * 24)
    );
    classes += daysRemaining < 30 ? "danger" : "";
    classes += item.quantity < 10 ? "warning" : "";
    return (
      <tr key={index} className={classes}>
        <td>
          <Link to={`/${item.name}`}>{item.name}</Link>
        </td>
        <td>{item.brand}</td>
        <td>{item.price.toFixed(2)}</td>
        <td>{item.quantity}</td>
        <td>{this.getExpiryDateAsLocalString(item.expiryDate)}</td>
      </tr>
    );
  };

  render() {
    const totalPrice = this.getTotalPrice();
    const totalQuantity = this.getTotalQuantity();
    return (
      <section className="inventory">
        <div className="wrapper">
          <AddButton />
          <header>
            <h1>Stock Inventory Report</h1>
          </header>
          <section>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.stocks.map((item, index) =>
                  this.getFormattedItem(item, index)
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Totals</td>
                  <td>{totalPrice.toFixed(2)}</td>
                  <td>{totalQuantity}</td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
      </section>
    );
  }
}

export default Inventory;
