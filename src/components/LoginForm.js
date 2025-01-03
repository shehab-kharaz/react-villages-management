import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"

function Login() {
  return (
    <>
    <div className="main-modal">
      <form>
        <h3>Login</h3>
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
          Don't have an account?  Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      </div>
    </>
  );
}

export default Login;
