import React, { useState } from "react";
import AddBeerAdmin from "./AddBeerAdmin";
import Leaderboard from "../Leaderboard";
import ListOfBeers from "./ListOfBeers";

const Beers = props => {
  const [state, setstate] = useState(<ListOfBeers />);

  const changeDiv = async e => {
    props.changeActive(e);
    switch (e) {
      case "ListOfBeer":
        return setstate(<ListOfBeers />);
      case "AddBeerAdmin":
        return setstate(<AddBeerAdmin />);
      case "Leaderboard":
        return setstate(<Leaderboard />);
      default:
        return setstate(<ListOfBeers />);
    }
  };

  return (
    <>
      <div className="title">Beers</div>
      <div className="navSlide">
        <ul>
          <li
            name="ListOfBeers"
            onClick={changeDiv.bind(null, "ListOfBeers")}
            className="active">
            List of Beers
          </li>
          <li
            name="AddBeerAdmin"
            onClick={changeDiv.bind(null, "AddBeerAdmin")}>
            Add Beer
          </li>
          <li name="Leaderboard" onClick={changeDiv.bind(null, "Leaderboard")}>
            Leaderboard
          </li>
        </ul>
      </div>
      <div id="infoContainer" className="container">
        <div className="actualInfo">{state}</div>
      </div>
    </>
  );
};

export default React.memo(Beers);
/*
export default React.memo(Beers, (prevProps,nextProps) => {;
    return nextProps.whatever === preProps.whatever
});
*/
