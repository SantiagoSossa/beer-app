import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database'; 
import "firebase/auth";

import BeautyStars from 'beauty-stars';

export default class AddBeer extends Component {

    state = {
        name: '',
        country: '',
        alcohol: '',
        photo: '',
        value: 0,
        loading: false
    }
    
    addNewBeer = async (e) => {
        e.preventDefault();
        console.log("value",this.state.value);
        this.setState({loading:true});
        const { name, country, alcohol, ibu, photo } = e.target.elements;
        this.addBeerInfo(name,country,alcohol,ibu,this.state.value,await this.addBeerPicture(photo));
        name.value = '';
        country.value = '';
        alcohol.value = '';
        ibu.value = '';

    }

    addBeerInfo = (name, country, alcohol, ibu, rating, url) => {
        const db =  firebase.database();
        console.log("getvalue",this.state.value);
        const beerReference = db.ref('beers/'+firebase.auth().currentUser.uid).push({
            name: name.value,
            country: country.value,
            alcohol: alcohol.value,
            ibu: ibu.value,
            rating: rating,
            photo: url
        });
        this.setState({loading:false});
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
                        Rating
                        <BeautyStars
                            value={this.state.value}
                            onChange={value => this.setState({ value })}
                        />
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
                    <button 
                    type="submit" 
                    className="btn btn-block btn-primary rounded btn-shadow-hover"
                    disabled={this.state.loading}
                    >
                        {this.state.loading ? <div class="lds-dual-ring"></div> : <>Add</>}
                    </button>
                </form>
            </div>
        )
    }
}