import React from "react";
import { Link } from "react-router-dom";

function AddButton() {
  const navStyles = {
    padding: "8px 2px",
  };
  return (
    <nav style={navStyles}>
      <Link className="btn btn-primary add-button" to="/add">
        Add
      </Link>
    </nav>
  );
}

export default AddButton;
