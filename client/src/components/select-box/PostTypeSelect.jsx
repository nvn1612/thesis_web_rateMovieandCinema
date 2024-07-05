import React, { useState } from 'react';
import axios from 'axios';

export const PostTypeSelect = ({ onPostTypeChange }) => {
  const [selectedPostType, setSelectedPostType] = useState('');

  const levers = ['Tất cả', 'bài viết về phim', 'bài viết về rạp chiếu'];

  const handleChange = async (event) => {
    setSelectedPostType(event.target.value);
    if (onPostTypeChange) {
      let response;
      switch (event.target.value) {
        case 'bài viết về phim':
          response = await axios.get('/post/getmovieposts');
          onPostTypeChange(response.data);
          break;
        case 'bài viết về rạp chiếu':
          response = await axios.get('/post/gettheaterposts');
          onPostTypeChange(response.data);
          break;
        default:
          response = await axios.get('/post/getallposts');
          onPostTypeChange(response.data.filter(post => post.is_moderated));
          break;
      }
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={selectedPostType}
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Lọc chủ đề
        </option>
        {levers.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
