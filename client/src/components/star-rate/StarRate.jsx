import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const StarRate = ({ label, rating, setRating }) => {
  const handleClick = (index) => {
    if (rating === index + 1) {
      setRating(index);
    } else {
      setRating(index + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="font-bold text-sm min-w-28 ">{label}</label>
      <div className="flex space-x-1 w-2/3">
        {[...Array(10)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            size="xl"
            className={index < rating ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};