import React, { useState } from 'react';

export const UserSelect = () => {
  const [selectedUser, setSelectedUser] = useState('');

  const Users = ['Quản trị viên', 'khán giả',"chuyên gia"];

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
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
        <option value="Tất cả">Tất cả</option>
        {Users.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
