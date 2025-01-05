function VillageInfo({ village }) {
  return (
    <>
      <div className="village-image">
        {village.image ? (
          <img className="village-image-view" src={village.image} alt={village.name} />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="village-details">
        <div><strong>Name:</strong></div>
        <div>{village.name}</div>

        <div><strong>Region:</strong></div>
        <div>{village.region}</div>

        <div><strong>Land Area:</strong></div>
        <div>{village.landArea} sq km</div>

        <div><strong>Latitude:</strong></div>
        <div>{village.latitude}</div>

        <div><strong>Longitude:</strong></div>
        <div>{village.longitude}</div>

        <div><strong>Categories:</strong></div>
        <div>{village.categories.join(", ")}</div>
      </div>
    </>
  );
}

export default VillageInfo;