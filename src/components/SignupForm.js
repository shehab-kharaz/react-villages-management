import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.from || "/"; 

  return (
    <div className="main-modal">
      <form>
        <div className="header">
          <h3>Sign Up</h3>
          <button
            type="button"
            className="close-modal"
            onClick={() => navigate(previousRoute)}
          >
            &times;
          </button>
        </div>

        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign up</button>
        <p>
          Already have an account? 
          <Link to="/login" state={{ from: location.state?.from || "/" }}> Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
