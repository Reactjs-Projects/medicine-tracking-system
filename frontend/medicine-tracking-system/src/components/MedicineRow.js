import { useHistory } from "react-router-dom";

function MedicineRow(props) {
  const history = useHistory();
  const medicine = props.medicine;
  const daysRemaining = Math.ceil(
    (new Date(medicine.expiryDate).getTime() - Date.now()) / (1000 * 3600 * 24)
  );

  let classes = daysRemaining < 30 ? "danger" : "";
  classes += medicine.quantity < 10 ? "warning" : "";

  function getExpiryDateAsLocalString(expiryDate) {
    let date = new Date(expiryDate);
    return date.toDateString();
  }

  function handleClick(id) {
    history.push(`/${id}`);
  }

  return (
    <tr
      key={medicine.id}
      className={classes}
      onClick={() => handleClick(medicine.id)}
    >
      <td>{medicine.name}</td>
      <td>{medicine.brand}</td>
      <td>{medicine.price.toFixed(2)}</td>
      <td>{medicine.quantity}</td>
      <td>{getExpiryDateAsLocalString(medicine.expiryDate)}</td>
    </tr>
  );
}

export default MedicineRow;
