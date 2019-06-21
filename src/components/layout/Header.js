import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      {/* <h1>ESPD Validation Engine</h1>
      <Link style={linkStyle} to="/xmlval">
        XML Validation
      </Link>{" "}
      |{" "}
      <Link style={linkStyle} to="/datAcc">
        Data Acceptance
      </Link>{" "}
      |{" "}
      <Link style={linkStyle} to="/datper">
        Data Persistence
      </Link> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <span className="navbar-brand mb-0 h1">
            <Link style={linkStyle} to="/">
              ESPD Validation Engine
            </Link>
          </span>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" style={linkStyle} to="/xmlval">
                  XML Validation
                </Link>
                <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={linkStyle} to="/datAcc">
                  Data Acceptance
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={linkStyle} to="/datper">
                  Data Persistence
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

// const headerStyle = {
//   background: "#333",
//   color: "#fff",
//   textAlign: "center",
//   padding: "10px"
// };

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default Header;
