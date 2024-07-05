import React, { useState } from 'react';

export const RegionSelect = ({ onRegionChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const Regions = ['Miền bắc', 'Miền trung', 'Miền nam'];

  const handleChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    onRegionChange(region);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedRegion} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Vùng miền
        </option>
        <option value="Tất cả">Tất cả</option>
        {Regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};
