import React from "react";

function NavigationControls({ sortOption, handleSortChange, currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="villages-sort">
      <div>
        <label htmlFor="sort-by">Sort by:</label>
        <select name="sort-by-drop-down" id="sort-by" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      <div>
        <span>Page:</span>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default NavigationControls;
