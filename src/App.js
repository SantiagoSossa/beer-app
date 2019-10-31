//Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//Style
import './css/main.css';

//Components
import Landing from './components/Landing/Landing'

//Firebase
import firebase from 'firebase';
import { firebaseConfig } from './config/config.js'
import 'firebase/database'; 

const app = firebase.initializeApp(firebaseConfig);
const db = app.database().ref().child('beer');
/** 
 * To use firebase methods just use db in the logical component through inheritance
 Save new file props.db.push().set({ object to be saved })
 *  Example
 *  this.props.db.push().set({
      title: this.state.title,
      description: this.state.description,
      timestamp : Date()
    })
 * 
 */

export default function App(props) {
  return(
    <Router>
      <Route exact path="/" component={Landing} />
    </Router>
  )
}