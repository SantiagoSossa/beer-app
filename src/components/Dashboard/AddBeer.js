import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database'; 
import "firebase/auth";

export default class AddBeer extends Component {

    state = {
        name: '',
        country: '',
        alcohol: '',
        photo: ''
    }

    addNewBeer = async (e) => {
        e.preventDefault();
        const { name, country, alcohol, ibu, rating, photo } = e.target.elements;
        this.addBeerInfo(name,country,alcohol,ibu,rating,await this.addBeerPicture(photo));
        name.value = '';
        country.value = '';
        alcohol.value = '';
        ibu.value = '';

    }

    addBeerInfo = (name, country, alcohol, ibu, rating, url) => {
        const db =  firebase.database();
        const beerReference = db.ref('beers/'+firebase.auth().currentUser.uid).push({
            name: name.value,
            country: country.value,
            alcohol: alcohol.value,
            ibu: ibu.value,
            rating: rating.value,
            photo: url
        });
    }


    getRandomId =  () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addBeerPicture = async (photo) => {
        const user = (firebase.auth().currentUser.uid).toString();
        const fileName = photo.files[0].name;
        const fileDate = this.getRandomId();
        console.log("test", user+fileDate+fileName);
        var blob = photo.files[0].slice(0, photo.files[0].size, 'image/png'); 
        const newFile = new File([blob], user+fileDate+fileName , {type: 'image/png'});
        const photoUpload = await firebase.storage().ref('beer_photos/'+ newFile.name);
        await photoUpload.put(newFile);
        
        const url = await firebase.storage().ref().child('beer_photos/'+newFile.name).getDownloadURL();
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
                        IBU
                        <input className="form-control" type="text" name="ibu" id="" placeholder="Beer IBU"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                    <div className="star-rating">
                        Rating
                        <div className="rate">
                            <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="text">1 star</label>
                        </div>
                    </div>
                    </label>
                    </div>
                    <div className="form-group">
                    <label style={{"color": "white"}}>
                        Photo
                        <br></br>
                        <span><i class="fas fa-camera"></i></span>
                        <input className="form-control" type="file" style={{display:'none'}} name="photo" id="" placeholder="Beer Photo"/>
                    </label>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary rounded btn-shadow-hover">Add</button>
                </form>
            </div>
        )
    }
}