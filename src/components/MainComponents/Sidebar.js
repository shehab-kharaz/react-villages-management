import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthenticationContext";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css";

function Sidebar() {
  const imgSrc = "https://via.placeholder.com/50x50.png?text=Image";
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed((prevState) => !prevState);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      if (!isCollapsed) {
        rootElement.style.gridTemplateColumns = "75px 1fr";
        rootElement.style.gridTemplateAreas = `"sidebar main"`;
      } else {
        rootElement.style.gridTemplateColumns = "250px 1fr";
        rootElement.style.gridTemplateAreas = `"sidebar main"`;
      }
    }
  };

  return (
    <aside className={isCollapsed ? "collapsed-aside" : ""}>
      <h2>
        <span id="toggleButton" onClick={handleToggle}>
          &#8801;
        </span>
        <span id="heading">Dashboard</span>
      </h2>

      <nav>
        <ul>
          <li onClick={() => navigate("/")}>
            <span className="icon">&#x1f4ca;</span>
            <span id="page-name">Overview</span>
          </li>
          <li onClick={() => navigate("/management")}>
            <span className="icon">&#128203;</span>
            <span id="page-name">Management</span>
          </li>
          <li onClick={() => navigate("/chat")}>
            <span className="icon">&#128172;</span>
            <span id="page-name">Chat</span>
          </li>
          <li onClick={() => navigate("/gallery")}>
            <span className="icon">&#127748; </span>
            <span id="page-name">Gallery</span>
          </li>
        </ul>
      </nav>

      <div>
        {user ? (
          <figure>
            <img src={imgSrc} alt="admin" />
            <figcaption>{user.fullName}</figcaption>
            <button onClick={logout}>Logout</button>
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
