import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import deleteBeer from "./deleteBeer";

const ListOfBeers = props => {
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (isMounted) {
      const getData = () => {
        firebase
          .database()
          .ref("officialBeers/")
          .on("value", async snapshot => {
            if (snapshot.val() != null) {
              const keys = Object.keys(snapshot.val());
              const beers = Object.values(Object.values(snapshot.val()));
              const beersAndKeys = [];
              for (let i = 0; i < beers.length; i++) {
                beers[i].id = keys[i];
                beersAndKeys.push(beers[i]);
              }
              setBeerList(beersAndKeys);
            }
            setIsLoading(false);
          });
      };
      getData();
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  const showImage = url => {
    setModalImage(url);
    const modal = document.querySelector(".modalImg");
    modal.style.display = "block";
    modal.addEventListener("click", () => {
      modal.style.display = "none";
      modal.removeEventListener("click", () => {});
    });
  };

  let content = isLoading ? (
    <div className="loading">
      <div className="spiner">
        <div className="circle"> </div>{" "}
      </div>{" "}
    </div>
  ) : (
    <div className="listOfBeers listOfRequests">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alcohol Rate %</th>
            <th>IBU</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beerList.map(beer => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>{beer.alcohol}</td>
              <td>{beer.IBU}</td>
              <td>
                <img
                  onClick={showImage.bind(null, beer.photo)}
                  src={beer.photo}
                  alt=""
                />
              </td>
              <td>
                <button>
                  <i
                    onClick={deleteBeer.bind(null, "officialBeers", beer.id)}
                    title="Unofficial"
                    style={{ color: "#e83634" }}
                    className="fas fa-times-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal modalImg">
        <img src={modalImage} alt="" />
      </div>
    </div>
  );

  return content;
};

export default React.memo(ListOfBeers);
