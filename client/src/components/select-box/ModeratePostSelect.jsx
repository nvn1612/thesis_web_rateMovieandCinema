import React, { useState } from 'react';
import axios from 'axios';

export const ModeratePostSelect = ({ onPostChange }) => {
  const [selectedPost, setSelectedPost] = useState('');

  const posts = ['Tất cả', 'Bài viết đã được kiểm duyệt', 'Bài viết chưa được kiểm duyệt'];

  const handleChange = async (event) => {
    setSelectedPost(event.target.value);
    if (onPostChange) {
      let response;
      switch (event.target.value) {
        case 'Bài viết đã được kiểm duyệt':
          response = await axios.get('/post/getmoderatedposts');
          onPostChange(response.data);
          break;
        case 'Bài viết chưa được kiểm duyệt':
          response = await axios.get('/post/getunmoderatedposts');
          onPostChange(response.data);
          break;
        case 'Tất cả':
          response = await axios.get('/post/getallposts');
          onPostChange(response.data);
          break;
        default:
          response = await axios.get('/post/getallposts');
          onPostChange(response.data);
          break;
      }
    }
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedPost} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Bài viết kiểm duyệt
        </option>
        {posts.map((post, index) => (
          <option key={index} value={post}>
            {post}
          </option>
        ))}
      </select>
    </div>
  );
};
