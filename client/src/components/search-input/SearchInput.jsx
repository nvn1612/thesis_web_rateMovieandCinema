import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchInput = ({ onSearch, contentSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder={contentSearch}
        className="border border-gray-400 rounded-lg p-1 w-64"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value === '') {
            onSearch(''); 
          }
        }}
      />
      <button
        type="button"
        className="pt-1 pl-2 pr-2 pb-1 rounded-lg bg-green-500 text-white"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};
