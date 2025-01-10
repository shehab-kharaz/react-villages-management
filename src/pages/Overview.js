import "../styles/overview.css";
import { useQuery } from "@apollo/client";
import PieChartComponent from "../components/PieChart";
import BarChartComponent from "../components/BarChart";
import { GET_STATISTICS } from "../queries/villageQueries"
import MapComponent from "../components/MainComponents/MapComponent";


function Overview() {
  const { loading, error, data } = useQuery(GET_STATISTICS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const {
    totalVillages,
    totalUrbanAreas,
    totalPopulation,
    averageLandAreaInSqKm,
    ageDistribution,
    genderRatio,
    populationDistribution,
  } = data.statistics;


  return (
    <main>
      <h1>Overview</h1>
      <div className="map-container">
      <div 
        id="map">
        <MapComponent />
      </div>
    </div>

      <div className="info-container">
        <div className="info-box" id="village-count">
          <h3>Total Number of Villages</h3>
          <p id="village-number">{totalVillages}</p>
        </div>
        <div className="info-box" id="urban-count">
          <h3>Total Number of Urban Areas</h3>
          <p id="urban-number">{totalUrbanAreas}</p>
        </div>
        <div className="info-box" id="population-size">
          <h3>Total Population Size</h3>
          <p id="population-number">{totalPopulation.toLocaleString()}</p>
        </div>
        <div className="info-box" id="average-land-area">
          <h3>Average Land Area</h3>
          <p id="land-area-number">{averageLandAreaInSqKm}</p>
          <span>sq km</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <PieChartComponent chartData={ageDistribution} />
        </div>
        <div className="chart-box">
          <PieChartComponent chartData={genderRatio} />
        </div>
        <div className="chart-box">
          <BarChartComponent chartData={populationDistribution} />
        </div>
      </div>
    </main>
  );
}

export default Overview;
