import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";

const Pending = props => {
  const [requestsPending, setRequestsPending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      await firebase
        .database()
        .ref("requestOfficialBeers/")
        .on("value", async snapshot => {
          const keys = Object.keys(snapshot.val());
          const request = Object.values(snapshot.val());
          const pending = [];
          for (let i = 0; i < request.length; i++) {
            request[i].id = keys[i];
            if (request[i].state == "pending") {
              pending.push(request[i]);
            }
          }
          setRequestsPending(pending);
          setIsLoading(false);
        });
    };
    getData();
  }, []);

  const makeOfficial = async ({ name, country, alcohol, id, IBU, photo }) => {
    try {
      await firebase
        .database()
        .ref("officialBeers/")
        .push({
          name,
          country,
          alcohol,
          IBU,
          rating: 0,
          photo
        });
      await firebase
        .database()
        .ref("requestOfficialBeers/" + id)
        .update({
          name,
          country,
          alcohol,
          state: "published",
          IBU,
          photo
        });
      return true;
    } catch {
      return false;
    }
  };

  let content = isLoading ? (
    <div className="loading">
      <div className="spiner">
        <div className="circle"> </div>{" "}
      </div>{" "}
    </div>
  ) : (
    <div className="listOfRequests">
      {" "}
      {requestsPending.map(request => (
        <div key={request.name}>
          <p> {request.name} </p> <p> {request.state} </p>{" "}
          <button
            onClick={makeOfficial.bind(null, request)}
            className="btn btn-primary rounded btn-shadow-hover">
            Make Official{" "}
          </button>{" "}
        </div>
      ))}{" "}
    </div>
  );

  return content;
};

export default React.memo(Pending);
/*
export default React.memo(Pending, (prevProps,nextProps) => {;
    return nextProps.whatever === preProps.whatever
});
*/
