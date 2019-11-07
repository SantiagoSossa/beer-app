import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import Beer from "../Dashboard/Beer";
import app from "../Backend/Base";

const ListOfBeers = props => {
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (isMounted) {
      const getData = () => {
        firebase
          .database()
          .ref("officialBeers/")
          .on("value", async snapshot => {
            const beers = Object.values(Object.values(snapshot.val()));
            setBeerList(beers);
            setIsLoading(false);
          });
      };
      getData();
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  let content = isLoading ? (
    <div className="loading">
      <div className="spiner">
        <div className="circle"> </div>{" "}
      </div>{" "}
    </div>
  ) : (
    <div className="listOfBeers">
      {" "}
      {beerList.map(beer => (
        <Beer
          key={beer.name}
          name={beer.name}
          country={beer.country}
          alcohol={beer.alcohol}
        />
      ))}{" "}
    </div>
  );

  return content;
};

export default React.memo(ListOfBeers);
