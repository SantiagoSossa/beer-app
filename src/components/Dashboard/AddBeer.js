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
            <div className="" id="">
                <form onSubmit={this.addNewBeer}>
                    <label>
                        Name
                        <input type="text" name="name" id="" placeholder="Beer Name"/>
                    </label>
                    <label>
                        Country
                        <input type="text" name="country" id="" placeholder="Beer Country"/>
                    </label>
                    <label>
                        Alcohol
                        <input type="text" name="alcohol" id="" placeholder="Beer Acohol %"/>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}