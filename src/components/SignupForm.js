import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../queries/villageQueries";
import "../styles/login.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.from || "/"; 

  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => navigate(previousRoute),
    onError: (error) => console.error("Signup error:", error)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: { fullName, username, password } });
  };

  return (
    <div className="main-modal">
      <form onSubmit={handleSubmit}>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
