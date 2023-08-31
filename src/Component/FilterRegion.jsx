import React from "react";

const FilterRegion = ({ onRegionChange }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    onRegionChange(selectedRegion);
  };

  return (
    <div className="filter-region">
      <select className="region-select" onChange={handleRegionChange}>
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterRegion;
