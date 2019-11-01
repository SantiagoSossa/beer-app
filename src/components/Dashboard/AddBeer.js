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

    addNewBeer = (e) => {
        e.preventDefault();
        const { name, country, alcohol } = e.target.elements;
        firebase.database().ref('beers/'+firebase.auth().currentUser.uid).push({
            name: name.value,
            country: country.value,
            alcohol: alcohol.value,
            photo: 'Photo'
        });
        name.value = '';
        country.value = '';
        alcohol.value = '';
    }

    render() {
        return(
            <div className="addBeer" id="">
                <form onSubmit={this.addNewBeer}>
                    <div className="form-group">
                    <label>
                        Name
                        <input className="form-control" type="text" name="name" id="" placeholder="Beer Name"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label>
                        Country
                        <input className="form-control" type="text" name="country" id="" placeholder="Beer Country"/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label>
                        Alcohol
                        <input className="form-control" type="text" name="alcohol" id="" placeholder="Beer Acohol %"/>
                    </label>
                    </div>
                    <button type="submit" className="btn btn-big btn-primary btn-rounded btn-shadow-hover">Add</button>
                </form>
            </div>
        )
    }
}