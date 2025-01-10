function VillageForm({ formState, handleChange, handleImageUpload }) {
  return (
    <>
      <label>
        Village Name:
        <input
          type="text"
          name="villageName"
          placeholder="e.g., Jabalia"
          value={formState.villageName}
          onChange={handleChange}
        />
      </label>
      <label>
        Region:
        <input
          type="text"
          name="region"
          placeholder="e.g., Gaza"
          value={formState.region}
          onChange={handleChange}
        />
      </label>
      <label>
        Land Area (sq km)
        <input
          type="number"
          name="landArea"
          placeholder="e.g., 1.4"
          value={formState.landArea}
          onChange={handleChange}
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          step="0.0001"
          name="latitude"
          placeholder="e.g., 31.5294"
          value={formState.latitude}
          onChange={handleChange}
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          step="0.0001"
          name="longitude"
          placeholder="e.g., 34.4797"
          value={formState.longitude}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </label>
      <label>
        Categories:
        <input
          type="text"
          name="categories"
          placeholder="e.g., Urban, Rural"
          value={formState.categories}
          onChange={handleChange}
        />
      </label>
    </>
  );
}


export default VillageForm;