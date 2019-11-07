import React, { useState, useEffect } from "react";
import Pending from "./Pending";
const Requests = props => {
  const [state, setState] = useState(<Pending />);

  const changeDiv = async e => {
    props.changeActive(e);
    switch (e) {
      case "Pending":
        return setState(<Pending />);
      default:
        return setState(<Pending />);
    }
  };

  return (
    <>
      <div className="title">Requests</div>
      <div className="navSlide">
        <ul>
          <li
            name="ListOfBeers"
            onClick={changeDiv.bind(null, "ListOfBeers")}
            className="active">
            Pending
          </li>
        </ul>
      </div>
      <div id="infoContainer" className="container">
        <div className="actualInfo">{state}</div>
      </div>
    </>
  );
};

export default React.memo(Requests);
/*
export default React.memo(Requests, (prevProps,nextProps) => {;
    return nextProps.whatever === preProps.whatever
});
*/
