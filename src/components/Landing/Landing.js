//Dependencies
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import beers from "../../assets/beers.json";

//Components
import NavLanding from "./NavLanding";
import app from "../Backend/Base";

export default class Landing extends Component {
  state = {
    currentBeer: {}
  };

  componentDidMount() {
    const randomBeer = beers[Math.floor(Math.random() * beers.length)];
    this.setState({
      currentBeer: {
        id: randomBeer.id,
        name: randomBeer.name,
        image: randomBeer.image,
        country: randomBeer.country,
        alcoholRate: randomBeer.alcoholRate
      }
    });
  }

  render() {
    return (
      <div id="landing">
        <NavLanding />
        <header className="headerLanding" id="headerLanding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="headerLanding__left">
                  <div className="headerLanding__left-beerContainer">
                    <img
                      src="/images/beer-pilot-3.png"
                      className="unselectable"
                      alt=""
                    />
                    <div className="shadowOfCurrentImage">
                      <img
                        src="/images/beer-pilot-3.png"
                        className="unselectable"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8">
                  <div className="headerLanding__right">
                      <div className="title title-big">Find the beer <br/> just for <br/> you</div>
                      <div className="text text-medium">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, repellat nihil laudantium fuga animi quibusdam quasi placeat nostrum totam veritatis.
                      </div>
                      <Link  to="/signup">
                        <button className="btn btn-big btn-primary btn-rounded btn-shadow-hover">Register</button>
                      </Link>
                  </div>
                </div>
              </div>
            </div>
        </header>
        <main id="mainLanding" className="mainLanding">
          <div className="container">
            <div className="title title-big">How It Works</div>
            <div className="row" id="howItWorks">
              <div className="col-12 col-md-4">
                <img src="/images/beer-pilot-2.png" alt=""/>
                <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, minus?</p>
              </div>
              <div className="col-12 col-md-4">
                <img src="/images/beer-pilot-2.png" alt=""/>
                <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, minus?</p>
              </div>
              <div className="col-12 col-md-4">
                <img src="/images/beer-pilot-2.png" alt=""/>
                <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, minus?</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
