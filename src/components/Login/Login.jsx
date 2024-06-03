import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Login.css";

import { loginUser, signupUser } from "../../redux/slices/authSlice";
import Loading from "../Layout/Loading/Loading";

//////////////////// ----- Login signup Component ----- ////////////////////

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isRightPanelActive, setRightPanelActive] = useState(false);

  ////////// ---- Right panel toggler ---- //////////
  const toggleRightPanel = () => {
    setRightPanelActive((prevState) => !prevState);
  };

  ////////// ---- Message toast ---- //////////

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  ////////// ---- Login Handler ---- //////////

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      userName,
      password,
    };
    dispatch(loginUser({ credentials, navigate }));
  };

  ////////// ---- Sign Up Handler ---- //////////

  const handleSignup = (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
      roles: ["Manager", "User"],
    };
    dispatch(signupUser({ userData, navigate }));
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
          id="container"
        >
          {/* ////////// ---- Sign Up container ---- ////////// */}

          <div className="form-container sign-up-container">
            <form className="form" onSubmit={handleSignup}>
              <h1 className="h1">Create Account</h1>
              <input
                className="input"
                type="text"
                placeholder="First Name"
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Last Name"
                required
                onChange={(event) => setLastName(event.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="UserName"
                required
                onChange={(event) => setUserName(event.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Phone Number"
                required
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <button className="button" type="submit">
                Sign Up
              </button>
            </form>
          </div>

          {/* ////////// ---- Login container ---- ////////// */}

          <div className="form-container sign-in-container">
            <form className="form" onSubmit={handleLogin}>
              <h1 className="h1">Sign in</h1>
              <input
                className="input"
                type="text"
                placeholder="UserName"
                required
                onChange={(event) => setUserName(event.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
              <Link to={"/mailrequest"} className="a">
                Forgot your password?
              </Link>
              <button className="button" type="submit">
                Sign In
              </button>
              <Link className="a" to={"/"}>
                Go back
              </Link>
            </form>
          </div>

          {/* ////////// ---- overlay container ---- ////////// */}

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1">Welcome Back!</h1>
                <p className="p">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="button ghost"
                  id="signIn"
                  onClick={toggleRightPanel}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1">Hello !</h1>
                <p className="p">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="button ghost"
                  id="signUp"
                  onClick={toggleRightPanel}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
