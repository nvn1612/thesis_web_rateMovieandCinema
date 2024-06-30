import React, { useState } from 'react';

export const ActiveAccountSelect = () => {
  const [selectedAA, setselectedAA] = useState('');

  const AA = ['Chưa kích hoạt', 'Đã kích hoạt'];

  const handleChange = (event) => {
    setselectedAA(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedAA} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Tài khoản
        </option>
        <option value="Tất cả">Tất cả</option>
        {AA.map((active, index) => (
          <option key={index} value={active}>
            {active}
          </option>
        ))}
      </select>
    </div>
  );
};
