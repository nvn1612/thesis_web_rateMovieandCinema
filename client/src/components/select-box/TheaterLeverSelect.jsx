import React, { useState } from 'react';

export const TheaterLeverSelect = () => {
  const [selectedLever, setSelectedLever] = useState('');

  const levers = ['Rạp phim xếp hạng cao', 'Rạp phim xếp hạng trung bình', 'Rạp phim xếp hạng kém'];

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
          Xếp hạng rạp chiếu phim
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
