import React from "react";
import MedicineRow from "./MedicineRow";

function MedicineTable(props) {
  const rows = [];
  const filterText = props.filterText;

  props.medicines.forEach((_medicine) => {
    if (_medicine.name.toLowerCase().indexOf(filterText) === -1) {
      return;
    }
    rows.push(<MedicineRow medicine={_medicine} key={_medicine.id} />);
  });

  function getTotalPrice() {
    let totalPrice = 0.0;
    props.medicines.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  function getTotalQuantity() {
    let totalQuantity = 0;
    props.medicines.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  return (
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
        {rows.length !== 0 ? (
          rows
        ) : (
          <tr>
            <td>
              <span>No Data Found</span>
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Totals</td>
          <td>{getTotalPrice().toFixed(2)}</td>
          <td>{getTotalQuantity()}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default MedicineTable;
