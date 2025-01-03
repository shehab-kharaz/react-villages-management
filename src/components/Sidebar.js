import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminImage from "../images/admin-image.jpeg";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); 
  
  return (
    <aside>
      <h2>
        <span id="toggleButton">&#8801;</span>
        <span id="heading">Dashboard</span>
      </h2>

      <nav>
        <ul>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <Link to="/management">Management</Link>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>

      <div>
        {isLoggedIn ? (
          <figure>
            <img src={AdminImage} alt="admin" />
            <figcaption>User Name</figcaption>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          </figure>
        ) : (
          <button>
            <Link to="/login" state={{ from: location.pathname }}>
              Login
            </Link>
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
