import React from "react";
import { Link } from "react-router-dom";

export default function NavLanding(props) {

  const handleBars = () => {
    const sideBar = document.querySelector(".navLandingMobile__side");
    const modal = document.querySelector(".modal");
    modal.style.display = "block"
    sideBar.style.left = "0%"
  }

  const handleModal = () => {
    const sideBar = document.querySelector(".navLandingMobile__side");
    const modal = document.querySelector(".modal");
    modal.style.display = "none"
    sideBar.style.left = "-100%"
  }

  return (
    <nav className="" id="navLanding">
      <div className="modal" onClick={handleModal} style={{"zIndex" : "100"}}></div>
      <div className="navLandingMobile">
        <div className="navLandingMobile__mainTitle">
          <i onClick={handleBars} className="fas fa-bars"></i>
          <Link to="/" className="brandMainTitleMobile">
            Beer App
          </Link>
        </div>
        <div className="navLandingMobile__side">
          <div className="container">
            <ul>
              <Link className="brand" to="/">
                <li style={{"fontSize":"4vh"}}>Beer App</li>
              </Link>
              <li className="ghostLi"></li>
              <Link to="#about">
                <li className=" ">About</li>
              </Link>
              <Link to="/dashboard">
                <li className="pill shadow">Go to dashboard</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="navLandingDesktop">
        <div className="container">
          <ul>
            <Link className="brand" to="/">
              <li>Home</li>
            </Link>
            <li className="ghostLi"></li>
            <Link to="#about">
              <li className=" ">About</li>
            </Link>
            <Link to="/dashboard">
              <li className="pill shadow">Go to dashboard</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
