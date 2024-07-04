import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const GenreSelect = ({ onGenreSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    
    const fetchGenres = async () => {
      try {
        const response = await axios.get('/movie/getgenres');
        setGenres(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thể loại", error);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenre(selectedValue);
    onGenreSelect(selectedValue);
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
        {genres.map((genre) => (
          <option key={genre.genre_id} value={genre.genre_id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};
