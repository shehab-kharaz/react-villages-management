import "../styles/dashboard.css";
import { useAuth } from "../contexts/AuthenticationContext";
import { useQuery } from "@apollo/client";
import { GET_VILLAGES  } from "../queries/villageQueries";
import { sortVillages, filterVillages, paginate } from "../utils/dashboardUtils";
import React, { useState } from "react";
import VillagesOptionsModal from "../components/MainComponents/VillagesOptionsModal";
import VillageList from "../components/MainComponents/VillagesList";
import NavigationControls from "../components/MainComponents/DashboardNavigationControl";

const ITEMS_PER_PAGE = 7;

function Dashboard() {
  const { user } = useAuth(); 
  const [modalState, setModalState] = useState({ isOpen: false, type: '', village: null });
 
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useQuery(GET_VILLAGES);
  const villages = data?.villages || [];
  const sortedVillages = sortVillages(villages, sortOption);
  const filteredVillages = filterVillages(sortedVillages, searchQuery);
  const paginatedVillages = paginate(filteredVillages, currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredVillages.length / ITEMS_PER_PAGE);

  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const openModal = (type, village = null) => {
    setModalState({ isOpen: true, type, village });
  };

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  const openDeleteConfirmation = (village) => {
    openModal('delete', village);
  };

  if (loading) return <p>Loading villages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      {
        user?.role === "admin" &&
        (
          <button className="add-new-village-btn" 
          onClick={() => openModal('add')}>
          Add New Village
          </button>
        )
      }
      <section>
        <h3>Village List</h3>
        <input
          type="text"
          placeholder="Search villages..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <NavigationControls
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <VillageList 
          villages={paginatedVillages} 
          onViewVillage={(village) => openModal('view', village)} 
          onUpdateVillage={(village) => openModal('update', village)} 
          onDeleteVillage={openDeleteConfirmation} 
          onUpdateDemographic={(village) => openModal('update-demographic', village)}
        />
      </section>

      <VillagesOptionsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        village={modalState.village}
      />
    </main>
  );
}

export default Dashboard;

