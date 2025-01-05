function DemographicForm({ formState, handleChange }) {
  return (
    <>
      <label>
        Population Size:
        <input
          type="number"
          name="populationSize"
          placeholder="e.g., 172704"
          value={formState.populationSize || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Age Distribution:
        <input
          type="text"
          name="ageDistribution"
          placeholder="e.g., 30(0-18), 40(19-35), 10(36-50), 120(51-65), 32(65+)"
          value={formState.ageDistribution || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender Ratio:
        <input
          type="text"
          name="genderRatio"
          placeholder="e.g., 102 male, 110 female"
          value={formState.genderRatio || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Population Growth Rate:
        <input
          type="number"
          name="populationGrowthRate"
          placeholder="e.g., 2.3"
          value={formState.populationGrowthRate || ""}
          onChange={handleChange}
        />
      </label>
    </>
  );
}

export default DemographicForm;
