import React, { Component } from 'react';
//Firebase
import firebase from 'firebase';
import { firebaseConfig } from '../../config/config';
import 'firebase/database'; 
import "firebase/auth";

const app = firebase.initializeApp(firebaseConfig);
console.log("firebase",app);

export default class Server extends Component {

    state = {
        
    }

    sendData = () => {
        firebase.database().ref('beers/').set({
            name: 'GuldenDrak',
            country: 'Belgium',
            alcohol: '11.5'
        })
    }

    render() {
        
        return(
            <div className="" id="">
                <button onClick={this.sendData()}>Send</button>
            </div>
        )
    }
}