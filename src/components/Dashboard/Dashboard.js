import React, { Component } from "react";
import app from "../Backend/Base";
import { Redirect } from "react-router-dom";
import AddBeer from "./AddBeer";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import Beer from "./Beer";

export default class Dashboard extends Component {
  state = {
    beerList: []
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
        const beer = snapshot.val();
        this.setState({ beerList: beer });
        console.log("here", beer);
      });
  };

  render() {
    const userName = firebase.auth().currentUser.email;
    const firstLetter = userName.charAt(0);
    let beers = [];
    if (this.state.beerList) {
      console.log("inside", typeof this.state.beerList);
      beers = Object.values(this.state.beerList).map((beer,i) => {
        console.log("pola", this.state.beerList[i]);
        return (
          <Beer
            name={beer.name}
            country={beer.country}
            alcohol={beer.alcohol}
            photo={beer.photo}
            rating={beer.rating}
          />
        );
      });
    }
    return (
      <div className="dashboard" id="">
        <div className="sideContainer">
          <div className="beersContainer">{beers}</div>
        </div>
        <div className="sideInfo">
          <div className="userInfo">
            <div className="userName">{firstLetter}</div>
          </div>
          <AddBeer />
          <button
            onClick={this.logout}
            className="btn btn-block btn-primary rounded btn-shadow-hover"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
