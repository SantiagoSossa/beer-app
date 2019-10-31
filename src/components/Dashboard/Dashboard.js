import React, { Component } from 'react';
import app from '../Backend/Base';
import { Redirect } from "react-router-dom";
import AddBeer from './AddBeer';
import firebase from 'firebase';
import 'firebase/database'; 
import "firebase/auth";
import Beer from './Beer';

export default class Dashboard extends Component {

    state = {
        beerList:[]
    }

    logout = () => {
        app.auth().signOut();
        return <Redirect to={"/"}/>;
    }

    componentWillMount = () =>{
        firebase.database().ref('beers/'+firebase.auth().currentUser.uid).on('value', snapshot => {
            const beer = snapshot.val();
            this.setState({beerList:beer});
            console.log("here",beer);
        });
        
    }

    render() {
        let beers = [];
        if(this.state.beerList){
            console.log("inside",this.state.beerList);
            beers = (Object.values(this.state.beerList)).map(beer =>{
                console.log("pola",beer.key);
                return <Beer name={beer.name} 
                            country={beer.country} 
                            alcohol={beer.alcohol} />;
            });
        }
        return(
            <div className="" id="">
                <AddBeer/>
                {beers}
                <button onClick={this.logout} className="btn btn-big btn-primary btn-rounded btn-shadow-hover">Logout</button>
            </div>
        )
    }
}