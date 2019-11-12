/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";

import NavAdmin from "./NavAdmin";
import Beers from "./Beers";
import Requests from "./Requests";
import "firebase/database";
import "firebase/auth";
import app from "../Backend/Base";
import { Redirect, Link } from "react-router-dom";
import notificationSound from "../../assets/sounds/notification.mp3";

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
    document
      .querySelector(".sideLeftMobile")
      .querySelector(".active")
      .classList.remove("active");
    document
      .querySelector(".sideLeftMobile")
      .querySelector("[name='" + e + "']")
      .classList.add("active");
    const sideLeft = document.querySelector(".sideLeftMobile");
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    sideLeft.style.left = "-100%";
  };

  const [userEmail, setUserEmail] = useState("");

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

  const [requestsPending, setRequestsPending] = useState([]);
  const notification = new Audio(notificationSound);

  useEffect(() => {
    let numItems = 0;
    let firstTime = true;
    const getData = async () => {
      await app
        .database()
        .ref("requestOfficialBeers/")
        .on("value", async snapshot => {
          if (snapshot.val() != null) {
            const keys = Object.keys(snapshot.val());
            const request = Object.values(snapshot.val());
            const pending = [];
            for (let i = 0; i < request.length; i++) {
              request[i].id = keys[i];
              if (request[i].state == "Pending") {
                pending.push(request[i]);
              }
            }

            if (!firstTime) {
              if (pending.length > numItems) {
                notification.play();
              }
            }

            setRequestsPending(pending);
            firstTime = false;
            numItems = pending.length;
          }
        });
    };
    getData();
  }, []);

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  return (
    <div className="" id="adminDashboard">
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
          <i className="fas fa-exclamation-circle"></i>Requests{" "}
          {requestsPending.length > 0 ? (
            <span className="pendingNotification">
              {requestsPending.length}
            </span>
          ) : null}
        </div>
      </div>
      <div className="sideLeftMobile">
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
          <i className="fas fa-exclamation-circle"></i>Requests{" "}
          {requestsPending.length > 0 ? (
            <span className="pendingNotification">
              {requestsPending.length}
            </span>
          ) : null}
        </div>
      </div>
      <div className="sideRight">
        <NavAdmin logout={logout} userEmail={userEmail} />
        <div id="actualComponent">{state}</div>
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
