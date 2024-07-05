import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserSelect = ({ onSelectionChange }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  const Users = ['Quản trị viên', 'khán giả', 'chuyên gia'];

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let url = '';
      switch (selectedUser) {
        case 'Quản trị viên':
          url = '/user/user-admin';
          break;
        case 'khán giả':
          url = '/user/user-audience';
          break;
        case 'chuyên gia':
          url = '/user/user-expert';
          break;
        case 'Tất cả':
          url = '/user/getAllUsers'; 
          break;
        default:
          setUsers([]);
          return;
      }

      try {
        const response = await axios.get(url);
        setUsers(response.data);
        onSelectionChange(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (selectedUser) {
      fetchUsers();
    }
  }, [selectedUser, onSelectionChange]);

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
