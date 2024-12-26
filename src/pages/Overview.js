import "../styles/overview.css";
import statistics from "../data/statistics.json"
import PieChartComponent from "../components/PieChart";
import BarChartComponent from "../components/BarChart";

const ageData = statistics.ageDistribution;
const genderData = statistics.genderRatios;
const populationData = statistics.populationDistribution;

function Overview() {
  return (
    <main>
      <h1>Overview</h1>
      <div className="map-container">
        <div id="map"></div>
      </div>

      <div className="info-container">
        <div className="info-box" id="village-count">
          <h3>Total Number of Villages</h3>
          <p id="village-number">{statistics.totalVillages}</p>
        </div>
        <div className="info-box" id="urban-count">
          <h3>Total Number of Urban Areas</h3>
          <p id="urban-number">{statistics.totalUrbanAreas}</p>
        </div>
        <div className="info-box" id="population-size">
          <h3>Total Population Size</h3>
          <p id="population-number">
            {statistics.totalPopulation.toLocaleString()}
          </p>
        </div>
        <div className="info-box" id="average-land-area">
          <h3>Average Land Area</h3>
          <p id="land-area-number">{statistics.averageLandAreaInSqKm}</p>
          <span>sq km</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <PieChartComponent chartData={ageData}/>
        </div>
        <div className="chart-box">
          <PieChartComponent chartData={genderData}/>
        </div>
        <div className="chart-box">
          <BarChartComponent chartData={populationData}/>
        </div>
      </div>
    </main>
  );
}

export default Overview;
