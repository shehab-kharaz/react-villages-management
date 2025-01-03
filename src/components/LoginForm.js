import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.from || "/"; 

  return (
    <div className="main-modal">
      <form>
      <div className="header">
          <h3>Log in</h3>
          <button
            type="button"
            className="close-modal"
            onClick={() => navigate(previousRoute)}
          >
            &times;
          </button>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>

        <p>
          Don't have an account? 
          <Link to="/signup" state={{ from: location.state?.from || "/" }}> Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
