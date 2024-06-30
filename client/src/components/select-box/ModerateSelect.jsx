import React, { useState } from 'react';

export const ModerateSelect = () => {
  const [selectedModerate, setselectedModerate] = useState('');

  const Moderates = ['Chưa kiểm duyệt', 'Đã kiểm duyệt'];

  const handleChange = (event) => {
    setselectedModerate(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedModerate} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Tài khoản
        </option>
        <option value="Tất cả">Tất cả</option>
        {Moderates.map((moderate, index) => (
          <option key={index} value={moderate}>
            {moderate}
          </option>
        ))}
      </select>
    </div>
  );
};
