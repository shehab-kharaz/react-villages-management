import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../queries/villageQueries";
import { useAuth } from "../../contexts/AuthenticationContext"; 
import "../../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = location.state?.from || "/";

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const { token, user } = data.login;
      login(user, token); 
      navigate(previousRoute); 
    },
    onError: (err) => console.log("")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation({ variables: { username, password } });
  };

  return (
    <div className="main-modal">
      <form onSubmit={handleSubmit}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>Login failed: {error.message}</p>}

        <p>
          Don't have an account?{" "}
          <Link to="/signup" state={{ from: location.state?.from || "/" }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
