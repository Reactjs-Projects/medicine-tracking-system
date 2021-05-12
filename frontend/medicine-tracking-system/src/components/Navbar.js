import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <ul className="navbar">
        <li className="navbar-item">
          <button type="button" className="btn btn-primary">
            <Link to="/add">Add</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
