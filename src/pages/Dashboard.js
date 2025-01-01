import "../styles/dashboard.css";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_VILLAGES } from "../queries/villageQueries";
import VillagesOptionsModal from "../components/VillagesOptionsModal"; 
import VillageList from "../components/VillagesList";
import { sortVillages, filterVillages, paginate } from "../utils/dashboardUtils";
import NavigationControls from "../components/DashboardNavigationControl";

const ITEMS_PER_PAGE = 7;

function Dashboard() {
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

  if (loading) return <p>Loading villages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <button className="add-new-village-btn" onClick={() => openModal('add')}>
        Add new village
      </button>
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
