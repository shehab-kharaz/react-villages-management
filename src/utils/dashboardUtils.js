export const sortVillages = (villages, sortOption) => {
  if (!villages) return [];
  switch (sortOption) {
    case "alphabetical":
      return [...villages].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return villages;
  }
};

export const filterVillages = (villages, searchQuery) => {
  if (!villages) return [];
  return villages.filter((village) =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    village.region.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const paginate = (data, currentPage, itemsPerPage) => {
  const startIndex = currentPage * itemsPerPage;
  return data.slice(startIndex, startIndex + itemsPerPage);
};
