/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import app from "../Backend/Base";
import "firebase/database";

import deleteBeer from "./deleteBeer";

const Pending = props => {
  const [requestsPending, setRequestsPending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      await app
        .database()
        .ref("requestOfficialBeers/")
        .on("value", async snapshot => {
          if (snapshot.val() != null) {
            const keys = Object.keys(snapshot.val());
            const request = Object.values(snapshot.val());
            const pending = [];
            for (let i = 0; i < request.length; i++) {
              request[i].id = keys[i];
              if (request[i].state == "Pending") {
                pending.push(request[i]);
              }
            }
            setRequestsPending(pending);
          }
          setIsLoading(false);
        });
    };
    getData();
  }, []);

  const makeOfficial = async ({ name, country, alcohol, id, IBU, photo }) => {
    try {
      await app
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
      await deleteBeer("requestOfficialBeers", id);
      return true;
    } catch {
      return false;
    }
  };

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
  ) : requestsPending.length > 0 ? (
    <div className="listOfRequests">
      <div className="modal modalImg">
        <img src={modalImage} alt="" />
      </div>
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
          {requestsPending.map(request => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.alcohol}</td>
              <td>{request.IBU}</td>
              <td>
                <img
                  onClick={showImage.bind(null, request.photo)}
                  src={request.photo}
                  alt=""
                />
              </td>
              <td>
                <button>
                  <i
                    onClick={makeOfficial.bind(null, request)}
                    title="Make Official"
                    className="fas fa-check-square"
                    style={{ color: "#a9d32e" }}
                  ></i>
                </button>
                <button>
                  <i
                    onClick={deleteBeer.bind(
                      null,
                      "requestOfficialBeers",
                      request.id
                    )}
                    title="Discard"
                    style={{ color: "#e83634" }}
                    className="fas fa-times-circle"
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div style={{ padding: "5vh", textAlign: "center" }}>No Data Found</div>
  );

  return content;
};

export default React.memo(Pending);
/*
export default React.memo(Pending, (prevProps,nextProps) => {;
    return nextProps.whatever === preProps.whatever
});
*/
