import "../styles/sidebar.css"
import AdminImage from '../images/admin-image.jpeg';
import { Link } from "react-router-dom";

function Sidebar(){
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
        <figure>
          <img src={AdminImage}alt="admin-image" />
          <figcaption>Admin name</figcaption>
        </figure>
        <button>Logout</button>
      </div>
   </aside>
  )
}

export default Sidebar;