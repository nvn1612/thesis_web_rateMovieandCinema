import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export const StarRate = ({label}) => {
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);

  const handleClick = (index) => {
    const newSelectedStars = [...selectedStars];
    newSelectedStars[index] = !newSelectedStars[index];
    setSelectedStars(newSelectedStars);
  }

  return (
    <div className="flex items-center space-x-2">
        <label className="font-bold text-sm w-2/4">{label}</label>
        <div className="flex space-x-1 w-2/4">
          {selectedStars.map((isSelected, index) => (
            <FontAwesomeIcon 
              key={index}
              icon={faStar}
              size="xl"
              className={isSelected ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
    </div>
  )
}