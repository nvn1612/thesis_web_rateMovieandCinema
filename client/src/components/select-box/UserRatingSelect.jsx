import React from 'react';

export const UserRatingSelect = ({ selectedUser, onUserChange }) => {
  const users = ['Đánh giá từ người dùng', 'Đánh giá từ chuyên gia'];

  const handleChange = (event) => {
    const user = event.target.value;
    onUserChange(user);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedUser} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
};
