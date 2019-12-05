//Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import findRandomBeer from "../findRandomBeer";
import GetFlag from "../GetFlag";
import app from "../Backend/Base";

//Components
import NavLanding from "./NavLanding";

export default class Landing extends Component {
  state = {
    currentBeer: {},
    getBeer: false,
    currentBeerImage: "/images/beer-pilot-2.png"
  };

  findBeer = () => {
    app
      .database()
      .ref("officialBeers/")
      .once("value", snapshot => {
        if (snapshot.val() != null) {
          const keys = Object.keys(snapshot.val());
          const beers = Object.values(Object.values(snapshot.val()));
          const beersAndKeys = [];
          for (let i = 0; i < beers.length; i++) {
            beers[i].id = keys[i];
            beersAndKeys.push(beers[i]);
          }
          const randomBeer =
            beersAndKeys[Math.floor(Math.random() * beersAndKeys.length)];
          this.setState({
            currentBeer: {
              id: randomBeer.id,
              name: randomBeer.name,
              image: randomBeer.photo,
              country: randomBeer.country,
              alcoholRate: randomBeer.alcohol,
              ibu: randomBeer.IBU,
              rating: randomBeer.rating
            },
            currentBeerImage: randomBeer.photo
          });

          const image = document.querySelector(".currentBeerImageLanding");
          const imageShadow = document.querySelector(
            ".currentBeerImageLandingShadow"
          );
          const landingCardInfo = document.querySelector("#landingCardInfo");

          image.style.transform = "translateX(-60%)";
          imageShadow.style.transform = "translate(-60%,-10px) rotate(180deg)";
          landingCardInfo.style.opacity = "1";
        }
      });
  };

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
                    <div className="hitMeContainer">
                      <button onClick={this.findBeer} className="hitMe">
                        Hit Me
                      </button>
                    </div>
                    <img
                      src={this.state.currentBeerImage}
                      className="unselectable currentBeerImageLanding"
                      alt=""
                    />
                    <div id="landingCardInfo">
                      <div className="beerName">
                        {this.state.currentBeer.name} <br />
                        <GetFlag flagName={this.state.currentBeer.country} />
                      </div>
                      <div className="beerData">
                        <div className="label">From</div>
                        <div>{this.state.currentBeer.country}</div>
                      </div>
                      <div className="beerData">
                        <div className="row">
                          <div className="col-sm-6">Alcohol</div>
                          <div className="col-sm-6">
                            {this.state.currentBeer.alcoholRate}
                          </div>
                        </div>
                      </div>
                      <div className="beerData">
                        <div className="row">
                          <div className="col-sm-6">IBU</div>
                          <div className="col-sm-6">
                            {this.state.currentBeer.ibu}
                          </div>
                        </div>
                      </div>
                      <div className="beerData">
                        <div className="row">
                          <div className="col-sm-6">Rating</div>
                          <div className="col-sm-6">
                            {this.state.currentBeer.rating}{" "}
                            <span aria-label="fire" role="img">
                              🔥
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shadowOfCurrentImage">
                      <img
                        src={this.state.currentBeerImage}
                        className="unselectable currentBeerImageLandingShadow"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="headerLanding__right">
                  <div className="title title-big">
                    Find the beer <br /> just for <br /> you
                  </div>
                  <div className="text text-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum, repellat nihil laudantium fuga animi quibusdam quasi
                    placeat nostrum totam veritatis.
                  </div>
                  <Link to="/signup">
                    <button className="btn btn-big btn-primary btn-rounded btn-shadow-hover">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-big btn-outline-primary btn-rounded btn-shadow-hover">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main id="mainLanding" className="mainLanding">
          <div className="container" id="about">
            <div className="title title-big">How It Works</div>
            <div className="row" id="howItWorks">
              <div className="card col-12 col-md-3">
                <div className="py-2 px-2">
                  <div className="iconContainer">
                    <i className="far fa-user"></i>
                    <div className="number">1</div>
                  </div>
                  <p className="description mt-1">
                    <Link
                      to="/signup"
                      style={{ color: "white" }}
                      className="noStyle"
                    >
                      Create your account
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-1">
                <div className="dots">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
              <div className="card col-12 col-md-3">
                <div className="py-2 px-2">
                  <div className="iconContainer">
                    <i className="fas fa-plus"></i>
                    <div className="number">2</div>
                  </div>
                  <p className="description mt-1">Add the beer you like</p>
                </div>
              </div>
              <div className="col-12 col-md-1">
                <div className="dots">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </div>
              <div className="card col-12 col-md-3">
                <div className="py-2 px-2">
                  <div className="iconContainer">
                    <div className="number">3</div>
                    <i className="fas fa-search"></i>
                    {/* <i className="far fa-heart"></i> */}
                  </div>
                  <p className="description mt-1">
                    Keep a list of your favorites beers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer id="footerLanding" className="footerLanding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, vero. Vero non voluptate illum laudantium repudiandae
                nobis. Sed, quis debitis.
              </div>
              <div className="col-12 col-md-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, vero. Vero non voluptate illum laudantium repudiandae
                nobis. Sed, quis debitis.
              </div>
              <div className="col-12 col-md-4 social">
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
