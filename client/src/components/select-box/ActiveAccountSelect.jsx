import React, { useState } from 'react';
import axios from 'axios';

export const ActiveAccountSelect = ({ onSelectionChange }) => {
  const [selectedAA, setSelectedAA] = useState('');

  const AA = ['Tất cả', 'Chưa kích hoạt', 'Đã kích hoạt']; 

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedAA(selectedValue);

    try {
      let response;
      if (selectedValue === 'Chưa kích hoạt') {
        response = await axios.get('/user/user-unactive');
      } else if (selectedValue === 'Đã kích hoạt') {
        response = await axios.get('/user/user-active');
      } else {
        response = await axios.get('/user/getalluser'); 
      }

      onSelectionChange(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={selectedAA}
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="">Tài khoản</option>
        {AA.map((active, index) => (
          <option key={index} value={active}>
            {active}
          </option>
        ))}
      </select>
    </div>
  );
};
