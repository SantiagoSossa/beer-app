import React from "react";
import { Link } from "react-router-dom";

export default function NavLanding(props) {
  return (
    <nav className="" id="navLanding">
      <div className="container">
        <ul>
          <Link className="brand" to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li className=" ">About</li>
          </Link>
          <Link  to="/login">
            <li className="pill shadow">Login</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
