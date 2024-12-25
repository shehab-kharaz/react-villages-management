import "../styles/sidebar.css"

function Sidebar(){
  return (
   <div className="aside"> 
      <h2>
        <span id="toggleButton">&#8801;</span>
        <span id="heading">Dashboard</span>
      </h2>

      <ul>
        <li>
          <span className="icon">&#x1f4ca;</span>
          <a>Overview</a>
        </li>
        <li>
          <span className="icon">&#x1f4ca;</span>
          <a href="">Village Management</a>
        </li>
        <li>
          <span className="icon">&#x1f4ca;</span>
          <a href="">Chat</a>
        </li>
        <li>
          <span className="icon">&#x1f4ca;</span>
          <a href="">Gallery</a>
        </li>
      </ul>

      <div>
        <figure>
          <img src="" alt="admin-image" />
          <figcaption>Admin name</figcaption>
        </figure>
        <button>Logout</button>
      </div>
   </div>
  )
}

export default Sidebar;