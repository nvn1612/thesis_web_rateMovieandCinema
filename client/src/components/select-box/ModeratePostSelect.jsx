import React, { useState } from 'react';

export const ModeratePostSelect = () => {
  const [selectedPost, setSelectedPost] = useState('');

  const posts = ['Bài viết đã được kiểm duyệt', 'Bài viết chưa được kiểm duyệt'];

  const handleChange = (event) => {
    setSelectedPost(event.target.value);
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
        <option value="Tất cả">Tất cả</option>
        {posts.map((post, index) => (
          <option key={index} value={post}>
            {post}
          </option>
        ))}
      </select>
    </div>
  );
};
