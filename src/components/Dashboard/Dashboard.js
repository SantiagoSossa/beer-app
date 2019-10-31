import React, { Component } from 'react';
import app from '../Backend/Base';
import { Redirect } from "react-router-dom";

export default class Dashboard extends Component {

    state = {
        
    }

    logout = () => {
        app.auth().signOut();
        return <Redirect to={"/"}/>;
    }

    render() {
        return(
            <div className="" id="">
                Dashboard
                <button onClick={this.logout} className="btn btn-big btn-primary btn-rounded btn-shadow-hover">Logout</button>
            </div>
        )
    }
}