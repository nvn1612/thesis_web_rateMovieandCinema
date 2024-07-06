import React, { useState } from 'react';
import axios from 'axios';

export const UserPostSelect = ({ onUserChange,is_admin }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const users = ['Tất cả', 'Bài viết từ khán giả', 'Bài viết từ chuyên gia'];

  const handleChange = async (event) => {
    setSelectedUser(event.target.value);
    if (onUserChange) {
      let response;
      switch (event.target.value) {
        case 'Bài viết từ khán giả':
          response = await axios.get('/post/getaudposts');
          is_admin ? onUserChange(response.data) :
          onUserChange(response.data.filter(post => post.is_moderated));
          break;
        case 'Bài viết từ chuyên gia':
          response = await axios.get('/post/getexpertposts');
          is_admin ? onUserChange(response.data) :
          onUserChange(response.data.filter(post => post.is_moderated));
          break;
        default:
          response = await axios.get('/post/getallposts');
          is_admin ? onUserChange(response.data) :
          onUserChange(response.data.filter(post => post.is_moderated));
          break;
      }
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
          Lọc theo người dùng
        </option>
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
};
