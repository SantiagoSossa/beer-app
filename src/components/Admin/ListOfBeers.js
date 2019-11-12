/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import deleteBeer from "./deleteBeer";
import updateBeer from "./updateBeer";
import TableBeer from "./TableBeer";

const ListOfBeers = props => {
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [actualBeerId, setActualBeerId] = useState(null);
  const [beerData, setBeerData] = useState({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [wasDataSaved, setWasDataSaved] = useState(false);
  const [copyBeerList, setCopyBeerList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
            setCopyBeerList(beersAndKeys);
          }
          setIsLoading(false);
        });
    };
    getData();
  }, []);

  const showImage = url => {
    setModalImage(url);
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modalImg");
    modal.style.display = "block";
    modalImg.style.display = "block";
    modal.addEventListener("click", hideAll);
  };

  const showDelete = async e => {
    const modal = document.querySelector(".modal");
    await setActualBeerId(e.target.id);
    const modalDelete = document.querySelector(".modalDeleteAdmin");
    modal.style.display = "block";
    modalDelete.style.opacity = "1";
    modalDelete.style.transform = "translateX(-50%) scale(1)";
    modalDelete.style.visibility = "visible";
    modal.addEventListener("click", hideAll);
  };

  const showEdit = async ({
    name,
    id,
    country,
    alcohol,
    IBU,
    photo,
    rating
  }) => {
    await setActualBeerId(id);
    const modal = document.querySelector(".modal");
    const modalEdit = document.querySelector(".modalEditAdmin");
    await setBeerData({
      id,
      name,
      country,
      alcohol,
      IBU,
      photo,
      rating
    });
    modal.style.display = "block";
    modalEdit.style.opacity = "1";
    modalEdit.style.transform = "translateX(-50%) scale(1)";
    modalEdit.style.visibility = "visible";
    modal.addEventListener("click", hideAll);
  };

  const hideAll = () => {
    const modal = document.querySelector(".modal");
    const modalEdit = document.querySelectorAll(".modalAdmin");
    const modalImg = document.querySelector(".modalImg");
    modal.style.display = "none";
    modalEdit.forEach(modal => {
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
      modal.style.transform = "translateX(-50%) scale(0.7)";
    });
    modalImg.style.display = "none";
    modal.removeEventListener("click", () => {});
    setActualBeerId(null);
  };

  const changeBeerData = e => {
    setBeerData({
      ...beerData,
      [e.target.name]: e.target.value
    });
  };

  const updateThisBeer = async (ref, id, beer) => {
    setIsUpdatingData(true);
    if (await updateBeer(ref, id, beer)) {
      setIsUpdatingData(false);
      setWasDataSaved(true);
      setTimeout(() => {
        setWasDataSaved(false);
      }, 3000);
    }
  };
  const deleteThisBeer = async (ref, id) => {
    console.log(id);
    if (await deleteBeer(ref, id)) {
      hideAll();
    }
  };

  const searchBeer = e => {
    if (e.keyCode != null) {
      if (e.keyCode == 13) {
        const val = document.getElementById("searchBar").value;
        let newList = [];
        let currentList = [];

        if (val != "") {
          currentList = beerList;

          newList = currentList.filter(item => {
            const lc = item.name.toLowerCase();
            const filter = val.toLowerCase();
            return lc.includes(filter);
          });
        } else {
          newList = beerList;
        }
        setCopyBeerList(newList);
        return;
      }
      return;
    }
    const val = document.getElementById("searchBar").value;
    let newList = [];
    let currentList = [];

    if (val != "") {
      currentList = beerList;

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = val.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = beerList;
    }
    setCopyBeerList(newList);
  };

  let content = isLoading ? (
    <div className="loading">
      <div className="spiner">
        <div className="circle"> </div>{" "}
      </div>{" "}
    </div>
  ) : beerList.length > 0 ? (
    <div className="listOfBeers listOfRequests">
      <TableBeer
        beerList={copyBeerList}
        showDelete={showDelete}
        showEdit={showEdit}
        showImage={showImage}
        searchBeer={searchBeer}
      />
      <div className="modal"></div>
      <div className="modalImg">
        <img src={modalImage} alt="" />
      </div>
      <div className="modalAdmin modalDeleteAdmin">
        <h1>Borrar Datos</h1> <br />
        <div className="warning">
          <i className="fas fa-exclamation-triangle"></i> Todos los datos
          correspondientes serán eliminados de forma permanente{" "}
        </div>
        <div className="buttons">
          <button
            onClick={hideAll}
            className="btn rounded"
            style={{ opacity: "0.4" }}>
            Cancel
          </button>
          <button
            onClick={deleteThisBeer.bind(null, "officialBeers", actualBeerId)}
            className="btn btn-warning rounded">
            Delete
          </button>
        </div>
      </div>
      <div className="modalAdmin modalEditAdmin">
        <h1>Editar Datos</h1> <br />
        <div className="row">
          <div className="col-12 col-md-6 px-1">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={changeBeerData}
                type="text"
                name="name"
                id="name"
                value={beerData.name}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 px-1">
            <div className="form-group">
              <label htmlFor="alcohol">Alcohol</label>
              <input
                onChange={changeBeerData}
                type="number"
                name="alcohol"
                id="alcohol"
                value={beerData.alcohol}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 px-1">
            <div className="form-group">
              <label htmlFor="ibu">IBU</label>
              <input
                onChange={changeBeerData}
                type="number"
                name="IBU"
                id="ibu"
                value={beerData.IBU}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 px-1">
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                onChange={changeBeerData}
                type="text"
                name="photo"
                id="photo"
                value={beerData.photo}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          {wasDataSaved && (
            <span>
              <b>Saved</b>
            </span>
          )}
          <button
            onClick={hideAll}
            className="btn rounded"
            style={{ opacity: "0.4" }}>
            Cancel
          </button>
          <button
            onClick={updateThisBeer.bind(
              null,
              "officialBeers",
              actualBeerId,
              beerData
            )}
            disabled={isUpdatingData}
            className="btn btn-success rounded">
            {isUpdatingData ? <>Loading...</> : <>Save</>}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ padding: "5vh", textAlign: "center" }}>No Data Found</div>
  );

  return content;
};

export default React.memo(ListOfBeers);
