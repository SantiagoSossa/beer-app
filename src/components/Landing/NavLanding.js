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
          <li className="ghostLi"></li>
          <Link to="#about">
            <li className=" ">About</li>
          </Link>
          <Link  to="/dashboard">
            <li className="pill shadow">Go to dashboard</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
