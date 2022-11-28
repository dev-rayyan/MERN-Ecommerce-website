import React, { Fragment, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faGooglePlus,
} from "@fortawesome/free-brands-svg-icons";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  useEffect(() => {
    $("#signUp").on("click", function () {
      $("#container").addClass("right-panel-active");
    });
    $("#signIn").on("click", function () {
      $("#container").removeClass("right-panel-active");
    });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <Link className="backtohome" to="/">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
            </Link>
            <div class="login-container" id="container">
              <div class="form-container sign-up-container">
                <form className="login-form" onSubmit={registerSubmit}>
                  <h1>Create Account</h1>
                  <div class="social-container">
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faGooglePlus} />
                    </a>
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </div>
                  <span>or use your email for registration</span>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    className="login-input"
                    value={name}
                    onChange={registerDataChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    className="login-input"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className="login-input"
                    value={password}
                    onChange={registerDataChange}
                  />

                  <input type="submit" value="Sign Up" className="submit-btn" />
                </form>
              </div>
              <div class="form-container sign-in-container">
                <form className="login-form" onSubmit={loginSubmit}>
                  <h1>Sign in</h1>
                  <div class="social-container">
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faGooglePlus} />
                    </a>
                    <a href="#" class="social">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </div>
                  <span>or use your account</span>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="login-input"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className="login-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <a href="#">Forgot your password?</a>
                  <input type="submit" value="Sign In" className="submit-btn" />
                </form>
              </div>
              <div class="overlay-container">
                <div class="overlay">
                  <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button class="ghost submit-btn" id="signIn">
                      Sign In
                    </button>
                  </div>
                  <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button class="ghost submit-btn" id="signUp">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
