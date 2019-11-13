import React, { Component } from "react";
import app from "../Backend/Base";
import { Redirect } from "react-router-dom";
import AddBeer from "./AddBeer";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import Beer from "./Beer";
import Leaderboard from '../Leaderboard';

export default class Dashboard extends Component {
  state = {
    beerList: [],
    sideBar: 'mybeers'
  };

  logout = () => {
    app.auth().signOut();
    return <Redirect to={"/"} />;
  };

  componentWillMount = () => {
    firebase
      .database()
      .ref("beers/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        if (snapshot.val() != null) {
          const keys = Object.keys(snapshot.val());
          const beer = Object.values(snapshot.val());
          const pending = [];
          for (let i = 0; i < beer.length; i++) {
            beer[i].id = keys[i];
            pending.push(beer[i]);
          }
          this.setState({ beerList: pending });
          console.log("here", keys);
        }
      });
  };

  handleSideBar = (e) => {
    this.setState({sideBar:e.target.id});
    document.getElementById(e.target.id).style.opacity = 1;
  }

  render() {
    const userName = firebase.auth().currentUser.email;
    const firstLetter = userName.charAt(0);
    console.log(userName);
    let sideItems = [];
    if (this.state.beerList) {
      if(this.state.sideBar == 'mybeers'){
        sideItems = this.state.beerList.map((beer, i) => {
          return (
            <Beer
              name={beer.name}
              country={beer.country}
              alcohol={beer.alcohol}
              IBU={beer.ibu}
              photo={beer.photo}
              rating={beer.rating}
              id={beer.id}
            />
          );
        });
      }
      if(this.state.sideBar == 'leaderboard'){
        sideItems = <Leaderboard/>;
      }
    }
    return (
      <div className="dashboard">
        <div className="sideBar">
          <div className="brand">
            <img src="/images/logo/beer-logo-nobg.png" alt="" />
          </div>
          <div className="sideLinks">
            <div className="link">
              <i className="fas fa-beer" onClick={this.handleSideBar} style={{opacity: "0.4"}} id="mybeers"></i>
            </div>
            <div className="link">
              <i className="fas fa-chart-bar" onClick={this.handleSideBar} style={{opacity: "0.4"}} id="leaderboard"></i>
            </div>
            <div className="link">
              <i className="fas fa-sign-out-alt" onClick={this.logout} id="logout" style={{opacity: "0.4"}}></i>
            </div>
          </div>
        </div>
        <div className="sideInfo">
          <div className="userInfo">
            <div className="userName">{firstLetter}</div>
          </div>
          <AddBeer />
        </div>
        <div className="sideContainer">
          <div className="beersContainer">{sideItems}</div>
        </div>
      </div>
    );
  }
}
