import React from "react";
import { Link } from "react-router-dom";

function BackButton() {
  const navStyles = {
    padding: "8px 2px",
  };
  return (
    <nav style={navStyles}>
      <Link className="btn btn-primary back-button" to="/">
        Back
      </Link>
    </nav>
  );
}

export default BackButton;
