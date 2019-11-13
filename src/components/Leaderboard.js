import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";

const Leaderboard = props => {
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = () => {
      firebase
        .database()
        .ref("officialBeers/")
        .on("value", async snapshot => {
          if (snapshot.val() != null) {
            const beers = Object.values(Object.values(snapshot.val()));
            const sortedBeers = await beers.sort((a, b) => b.rating - a.rating);
            setBeerList(sortedBeers);
          }
          setIsLoading(false);
        });
    };
    getData();
  }, []);

  let content = (
    <div className="listOfRequests" id="">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="unselectable">
          <thead>
            <tr>
              <th>Beer</th>
              <th>
                Rating{" "}
                <span role="img" aria-label="rocket">
                  🚀
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {beerList.map(beer => (
              <tr key={beer.name}>
                <td>{beer.name}</td>
                <td>{beer.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return content;
};

export default React.memo(Leaderboard);
/*
export default React.memo(Leaderboard, (prevProps,nextProps) => {;
    return nextProps.whatever === preProps.whatever
});
*/
