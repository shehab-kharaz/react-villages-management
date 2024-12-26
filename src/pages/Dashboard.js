import "../styles/dashboard.css"

function Dashboard(){
  return (
    <main>
      <button className="add-new-village-btn">Add new village</button>
      <section>
        <h3>View Village List</h3>
        <input type="text" placeholder="Search villages..."></input>
        <div className="villages-sort">
          <div>
            <label htmlFor="sort-by">Sort by:</label>
            <select name="sort-by-drop-down" id="sort-by">
              <option value="default">Default</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          <div>
            <span>Page:</span>
            <button id="navigation">Prev</button>
            <button id="navigation">Next</button>
          </div>
        </div>

        <div>
          <div id="village-list-container"></div>
          <div></div>
        </div>
      </section>

      <div id="village-options-modal" role="dialog">
        <div id="modal-header">
          <h2 id="modal-title"></h2>
          <button id="modal-close-button">&#10006;</button>
        </div>
        <div id="modal-body"></div>
      </div>
      <div id="modal-backdrop" inert></div>
  </main>
  )
}

export default Dashboard;