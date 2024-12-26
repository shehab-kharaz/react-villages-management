import "../styles/overview.css"

function Overview(){
  return(
    <main>
      <h1>Overview</h1>
      <div className="map-container">
        <div id="map"></div> 
      </div>

      <div className="info-container">
        <div className="info-box" id="village-count">
          <h3>Total Number of Villages</h3>
          <p id="village-number">0</p>
        </div>
        <div className="info-box" id="urban-count">
          <h3>Total Number of Urban Areas</h3>
          <p id="urban-number">0</p>
        </div>
        <div className="info-box" id="population-size">
          <h3>Total Population Size</h3>
          <p id="population-number">0</p>
        </div>
        <div className="info-box" id="average-land-area">
          <h3>Average Land Area</h3>
          <p id="land-area-number">0</p>
          <span>sq km</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
            <canvas id="ageChart"></canvas>
        </div>
        <div className="chart-box">
            <canvas id="genderChart"></canvas>
        </div>
        <div className="chart-box">
            <canvas id="populationChart"></canvas>
        </div>
      </div>
    </main>
  )
}

export default Overview;