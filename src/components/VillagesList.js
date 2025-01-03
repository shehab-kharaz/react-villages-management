import React from "react";
import { useAuth } from "../contexts/AuthenticationContext";  

function VillageList({ villages, onViewVillage, onUpdateVillage, onDeleteVillage }) {
  const { user } = useAuth(); 

  return (
    <div id="village-list-container">
      {villages.map((village) => (
        <div
          className="village-item"
          key={village.name}
          data-village-id={village.name}
        >
          <div className="name-container">
            <span>{village.name}</span>-<span>{village.region}</span>
          </div>
          <div className="buttons-container">
            <button
              className="view-village-btn"
              onClick={() => onViewVillage(village)}
            >
              View
            </button>

            {user?.role === "admin" && (
              <>
                <button
                  className="update-village-btn"
                  onClick={() => onUpdateVillage(village)}
                >
                  Update Village
                </button>
                <button
                  className="delete-village-btn"
                  onClick={() => onDeleteVillage(village)}
                >
                  Delete Village
                </button>
                <button className="demographic-btn">
                  Update Demographic Data
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VillageList;
