//Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Style
import "./css/main.css";

//Components
import Landing from "./components/Landing/Landing";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import SignupAdmin from "./components/Auth/SignupAdmin";
import LoginAdmin from "./components/Auth/LoginAdmin";
import { AuthProvider } from "./components/Auth/Auth";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PrivateRouteAdmin from "./components/Auth/PrivateRouteAdmin";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Leaderboard from "./components/Leaderboard";

export default function App(props) {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signup-admin" component={SignupAdmin} />
            <Route exact path="/login-admin" component={LoginAdmin} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRouteAdmin
              exact
              path="/admin-dashboard"
              component={AdminDashboard}
            />
            <Route path="*">404 not found</Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}
