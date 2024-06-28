import React, { useState } from 'react';

export const PostTypeSelect = () => {
  const [selectedPostType, setselectedPostType] = useState('');

  const levers = [ 'bài viết về phim', 'bài viết về rạp chiếu'];

  const handleChange = (event) => {
    setselectedPostType(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedPostType} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Lọc bài viết
        </option>
        <option value="Tất cả">Tất cả</option>
        {levers.map((lever, index) => (
          <option key={index} value={lever}>
            {lever}
          </option>
        ))}
      </select>
    </div>
  );
};
