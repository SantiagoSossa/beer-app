import React, { Component } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";

export default class AddBeer extends Component {
  state = {
    name: "",
    country: "",
    alcohol: "",
    photo: "",
    loading: false,
    added: false
  };

  timer = "";

  addNewBeer = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { name, country, alcohol, ibu, rating, photo } = e.target.elements;
      this.addBeerInfo(
        name,
        country,
        alcohol,
        ibu,
        rating,
        await this.addBeerPicture(photo)
      );
      name.value = "";
      country.value = "";
      alcohol.value = "";
      ibu.value = "";
      this.setState({ loading: false, added: true });
      this.timer = setTimeout(() => {
        this.setState({
          added: false
        });
      }, 3000);
      return true;
    } catch {
      this.setState({ loading: false });
      return false;
    }
  };

  addBeerInfo = (name, country, alcohol, ibu, rating, url) => {
    firebase
      .database()
      .ref("officialBeers")
      .push({
        name: name.value,
        country: country.value,
        alcohol: alcohol.value,
        IBU: ibu.value,
        rating: 0,
        photo: url
      });
  };

  addBeerPicture = async photo => {
    const user = firebase.auth().currentUser.uid.toString();
    const fileName = photo.files[0].name;
    const fileDate = photo.files[0].lastModified.toString();
    var blob = photo.files[0].slice(0, photo.files[0].size, "image/png");
    const newFile = new File([blob], user + fileDate + fileName, {
      type: "image/png"
    });
    const photoUpload = await firebase
      .storage()
      .ref("beer_photos/" + newFile.name);
    await photoUpload.put(newFile);

    const url = await firebase
      .storage()
      .ref()
      .child("beer_photos/" + newFile.name)
      .getDownloadURL();
    return url;
  };

  render() {
    return (
      <div className="" id="addBeerAdmin">
        <form className="" onSubmit={this.addNewBeer}>
          <div className="row">
            <div className="col-12 col-md-6 px-1">
              <div className="form-group">
                <label>
                  Name
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Beer Name"
                  />
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 px-1">
              <div className="form-group">
                <label>
                  Country
                  <input
                    className="form-control"
                    type="text"
                    name="country"
                    id=""
                    placeholder="Beer Country"
                  />
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 px-1">
              <div className="form-group">
                <label>
                  Alcohol
                  <input
                    className="form-control"
                    type="text"
                    name="alcohol"
                    id=""
                    placeholder="Beer Acohol %"
                  />
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 px-1">
              <div className="form-group">
                <label>
                  IBU
                  <input
                    className="form-control"
                    type="text"
                    name="ibu"
                    id=""
                    placeholder="Beer IBU"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="form-group px-1">
            <label>
              Photo
              <input
                className="form-control"
                type="file"
                name="photo"
                id=""
                placeholder="Beer Photo"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={this.state.loading}
            className="btn btn-block btn-primary rounded btn-shadow-hover">
            {this.state.loading ? <>Loading...</> : <>Add</>}
          </button>
          {this.state.added ? <div className="success">Beer Added</div> : null}
        </form>
      </div>
    );
  }
}
