import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import app from "../Backend/Base";
import phrases from '../../assets/phrases'
import NavLanding from '../Landing/NavLanding'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <div id="signUp" className="signUp">
      {/* <NavLanding /> */}
      <div className="row">
        <div className="col-12 col-md-6 signUp__left">
          <div className="container">
            <form className="pretty" onSubmit={handleSignUp}>
              <div className="title">We are <Link to="/" className="noStyle">Beer App</Link></div>
              <div className="subtitle">
                Welcome, please fill the form with your data. <br/> <br/>
                SignUp
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
                Sign Up
              </button>
              <br />
              <p>
                Already a member? <Link to="/login">Click here</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6 signUp__right">
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

export default withRouter(SignUp);
