import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../Backend/Base";
import { AuthContext } from "./Auth.js";
import { Link } from 'react-router-dom';
import phrases from '../../assets/phrases'
import NavLanding from '../Landing/NavLanding'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <div id="signUp" className="signUp">
      {/* <NavLanding /> */}
      <div className="row">
        <div className="col-12 col-md-6 signUp__left">
          <div className="container">
            <form className="pretty" onSubmit={handleLogin}>
              <div className="title">We are <Link to="/" className="noStyle">Beer App</Link></div>
              <div className="subtitle">
                Welcome Back, please login to your account. <br/> <br/>
                Login
              </div>
              <div className="form-group">
                <label htmlFor="emailSignUp">
                  Email
                  <input
                  autoFocus="on"
                    id="emailSignUp"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="passwordSignUp">
                  Password
                  <input
                    id="passwordSignUp"
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </label>
              </div>
              <button
                className="btn btn-primary rounded btn-block"
                type="submit"
              >
                Login
              </button>
              <br />
              <p>
                Don't have an account? <Link to="/signup">Click here</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 login__right">
          <div className="phrase">
            "{randomPhrase}"
          </div>
          <div className="social">
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
