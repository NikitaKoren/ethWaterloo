import React from "react";
import { Link } from "react-router";

const LogoutButton = ({ onLogoutUserClick, name, balance }) => {
  return (
    <span>
      <li className="pure-menu-item">
        <span style={{ color: "white" }}>
          Hi, {name}. You have {balance} ETH
        </span>
      </li>
      <li className="pure-menu-item">
        <Link to="/dashboard" className="pure-menu-link">
          Dashboard
        </Link>
      </li>
      <li className="pure-menu-item">
        <Link to="/marketplace" className="pure-menu-link">
          Marketplace
        </Link>
      </li>
      <li className="pure-menu-item">
        <Link to="/profile" className="pure-menu-link">
          Profile
        </Link>
      </li>
      <li className="pure-menu-item">
        <a
          href="#"
          className="pure-menu-link"
          onClick={event => onLogoutUserClick(event)}
        >
          Logout
        </a>
      </li>
    </span>
  );
};

export default LogoutButton;
