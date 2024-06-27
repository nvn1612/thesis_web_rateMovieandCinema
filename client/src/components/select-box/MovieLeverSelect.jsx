import React, { useState } from 'react';

export const MovieLeverSelect = () => {
  const [selectedLever, setSelectedLever] = useState('');

  const levers = ['Phim xếp hạng cao', 'Phim xếp hạng trung bình', 'Phim xếp hạng kém'];

  const handleChange = (event) => {
    setSelectedLever(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedLever} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Xếp hạng phim
        </option>
        <option value="Tất cả">Tất cả</option>
        {levers.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
