import React, { useState } from 'react';
import axios from 'axios';

export const UserRatingSelect = ({ onUserChange,isMovie,movie_id, theater_id }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const users = ['Tất cả','Đánh giá từ người dùng', 'Đánh giá từ chuyên gia'];

  const handleChange = async (event) => {
    setSelectedUser(event.target.value);
    if (onUserChange) {
      let response;
      switch (event.target.value) {
        case 'Đánh giá từ người dùng':
          isMovie ? response = await axios.get(`/movie-rating/get-audi-movie-ratings/${movie_id}`)
          : response = await axios.get(`/theater-rating/get-audi-theater-ratings/${theater_id}`)
          onUserChange(response.data);
          break;
        case 'Đánh giá từ chuyên gia':
          isMovie ? response = await axios.get(`/movie-rating/get-expert-movie-ratings/${movie_id}`)
          : response = await axios.get(`/theater-rating/get-expert-theater-ratings/${theater_id}`)
          onUserChange(response.data);
          break;
        default:
          isMovie ?  response = await axios.get(`/movie-rating/get-movie-ratings-for-admin/${movie_id}`)
          : response = await axios.get(`/theater-rating/get-theater-ratings-for-admin/${theater_id}`)

          onUserChange(response.data);
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
