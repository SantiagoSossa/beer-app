import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database'; 
import "firebase/auth";

import Rating from './Rating';

export default class AddBeer extends Component {

    state = {
        name: '',
        country: '',
        alcohol: '',
        photo: ''
    }

    addNewBeer = async (e) => {
        e.preventDefault();
        const { name, country, alcohol, photo } = e.target.elements;
        this.addBeerInfo(name,country,alcohol,await this.addBeerPicture(photo));
        name.value = '';
        country.value = '';
        alcohol.value = '';
    }

    addBeerInfo = (name, country, alcohol, url) => {
        const db =  firebase.database();
        const beerReference = db.ref('beers/'+firebase.auth().currentUser.uid).push({
            name: name.value,
            country: country.value,
            alcohol: alcohol.value,
            photo: url
        });
    }

    addBeerPicture = async (photo) => {
        console.log("the beer photo",photo,photo.files[0],photo.files[0].name)
        const photoUpload = await firebase.storage().ref('beer_photos/'+ photo.files[0].name);
        await photoUpload.put(photo.files[0]);
        const url = await firebase.storage().ref().child('beer_photos/'+photo.files[0].name).getDownloadURL();
        return url;
    }

    render() {
        return(
            <div className="addBeer" id="">
                <form className="" onSubmit={this.addNewBeer}>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Name
                        <input className="form-control" type="text" name="name" id="" placeholder="Beer Name"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Country
                        <input className="form-control" type="text" name="country" id="" placeholder="Beer Country"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Alcohol
                        <input className="form-control" type="text" name="alcohol" id="" placeholder="Beer Acohol %"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Rating
                        <Rating/>
                        {/* <input className="form-control" type="text" name="alcohol" id="" placeholder="Beer Acohol %"/> */}
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Photo
                        <input className="form-control" type="file" name="photo" id="" placeholder="Beer Photo"/>
                    </label>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary rounded btn-shadow-hover">Add</button>
                </form>
            </div>
        )
    }
}