//Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//Style
import './css/main.css';

//Components
import Landing from './components/Landing/Landing'
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthProvider } from './components/Auth/Auth';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';


export default function App(props) {
  return(
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </AuthProvider>
  )
}