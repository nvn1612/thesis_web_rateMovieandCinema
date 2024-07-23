import React, { useState } from 'react';
import axios from 'axios';

export const UserSelect = ({ onSelectionChange }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const Users = ['Tất cả', 'Quản trị viên', 'khán giả', 'chuyên gia'];

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);

    try {
      let response;
      switch (selectedValue) {
        case 'Quản trị viên':
          response = await axios.get('/user/user-admin');
          break;
        case 'khán giả':
          response = await axios.get('/user/user-audience');
          break;
        case 'chuyên gia':
          response = await axios.get('/user/user-expert');
          break;
        case 'Tất cả':
          response = await axios.get('/user/getalluser');
          break;
        default:
          response = { data: [] };
      }

      onSelectionChange(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={selectedUser}
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Lọc người dùng
        </option>
        {Users.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
