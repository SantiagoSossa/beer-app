import React, { useState, useEffect } from "react";

import NavAdmin from "./NavAdmin";
import Beers from "./Beers";
import Requests from "./Requests";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import app from "../Backend/Base";
import { Redirect, Link } from "react-router-dom";

const AdminDashboard = props => {
  const logout = () => {
    app.auth().signOut();
    return <Redirect to={"/"} />;
  };

  const changeActiveRight = e => {
    document
      .querySelector(".sideRight")
      .querySelector(".active")
      .classList.remove("active");
    document.querySelector("[name='" + e + "']").classList.add("active");
  };

  const changeActiveLeft = e => {
    document
      .querySelector(".sideLeft")
      .querySelector(".active")
      .classList.remove("active");
    document.querySelector("[name='" + e + "']").classList.add("active");
  };

  const [state, setstate] = useState(
    <Beers changeActive={changeActiveRight} />
  );

  const changeDiv = e => {
    changeActiveLeft(e);
    switch (e) {
      case "Beers":
        return setstate(<Beers changeActive={changeActiveRight} />);
      case "Requests":
        return setstate(<Requests changeActive={changeActiveRight} />);
      default:
        return setstate(<Beers changeActive={changeActiveRight} />);
    }
  };

  return (
    <div className="dashboard" id="adminDashboard">
      <div className="sideLeft">
        <div className="brand">
          <Link to="admin-dashboard">
            <img src="/images/logo/beer-logoOnly.png" alt="" />
            Beer App
          </Link>
        </div>
        <div
          name="Beers"
          onClick={changeDiv.bind(null, "Beers")}
          className="active item">
          <i className="fas fa-beer"></i>Beers
        </div>
        <div
          name="Requests"
          onClick={changeDiv.bind(null, "Requests")}
          className="item">
          <i className="fas fa-exclamation"></i>Requests
        </div>
        {/* <button
          onClick={logout}
          className='btn btn-block btn-primary rounded btn-shadow-hover'>
          Logout
        </button> */}
      </div>
      <div className="sideRight">
        <NavAdmin />
        <div id="actualComponent">{state}</div>
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
