import "../styles/sidebar.css"
import AdminImage from '../images/admin-image.jpeg';

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
            <a href="/home.html">Overview</a>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <a href="/src/html/village-management.html">Village Management</a>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <a href="/src/html/chat.html">Chat</a>
          </li>
          <li>
            <span className="icon">&#x1f4ca;</span>
            <a href="/src/html/gallery.html">Gallery</a>
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