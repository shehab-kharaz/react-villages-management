import "../styles/dashboard.css";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_VILLAGES, ADD_VILLAGE } from "../queries/villageQueries";
import AddVillageModal from "../components/AddVillageModal";
import VillageList from "../components/VillagesList";
import { sortVillages, filterVillages, paginate } from "../utils/dashboardUtils";
import NavigationControls from "../components/DashboardNavigationControl";

const ITEMS_PER_PAGE = 7;

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useQuery(GET_VILLAGES);

  const [addVillage] = useMutation(ADD_VILLAGE, {
    update(cache, { data: { addVillage } }) {
      const existingVillages = cache.readQuery({ query: GET_VILLAGES });
      cache.writeQuery({
        query: GET_VILLAGES,
        data: {
          villages: [...existingVillages.villages, addVillage],
        },
      });
    },
    onError: (error) => console.error("Error adding village:", error),
  });

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
  const handleSaveVillage = (newVillage) => addVillage({ variables: { village: newVillage } });

  if (loading) return <p>Loading villages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <button className="add-new-village-btn" onClick={() => setIsModalOpen(true)}>
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
        <VillageList villages={paginatedVillages} />
      </section>
      {isModalOpen && <AddVillageModal onClose={() => setIsModalOpen(false)} onSave={handleSaveVillage} />}
    </main>
  );
}

export default Dashboard;
