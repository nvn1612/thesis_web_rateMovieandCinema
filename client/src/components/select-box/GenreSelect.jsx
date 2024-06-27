import React, { useState } from 'react';

export const GenreSelect = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Hành động', 'Phưu lưu', 'Hài kịch', 'Kinh dị', 'Lãng mạn', 'Hoạt hình', 'Khoa học viễn tưởng', 'Gia đình', 'Lịch sử', 'Chiến tranh'];

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedGenre} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Thể loại
        </option>
        <option value="Tất cả">Tất cả</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
