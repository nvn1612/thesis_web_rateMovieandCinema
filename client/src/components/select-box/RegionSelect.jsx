import React, { useState } from 'react';

export const RegionSelect = () => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const Regions = ['Miền bắc', 'Miền trung', 'Miền nam'];

  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
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
        {Regions.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
