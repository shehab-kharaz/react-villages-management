import React from "react";

function VillageList({ villages }) {

  const handleViewClick = (villageId) => {
    console.log("view", villageId);
  };

  const handleUpdateClick = (villageId) => {
    console.log("update", villageId);
  };

  const handleDeleteClick = (villageId) => {
    console.log("delete", villageId);
  };

  const handleDemographicClick = (villageId) => {
    console.log("update demogr", villageId);
  };

  return (
    <div id="village-list-container">
      {villages.map((village) => (
        <div className="village-item" key={village.name} data-village-id={village.name}>
          <div className="name-container">
            <span>{village.name}</span>-<span>{village.region}</span>
          </div>
          <div className="buttons-container">
            <button className="view-village-btn" onClick={() => handleViewClick(village.name)}>
              View
            </button>
            <button className="update-village-btn" onClick={() => handleUpdateClick(village.name)}>
              Update Village
            </button>
            <button className="delete-village-btn" onClick={() => handleDeleteClick(village.name)}>
              Delete Village
            </button>
            <button className="demographic-btn" onClick={() => handleDemographicClick(village.name)}>
              Update Demographic Data
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VillageList;
