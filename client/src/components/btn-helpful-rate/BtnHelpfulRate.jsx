import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export const BtnHelfulRate = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button onClick={handleClick} className={`focus:outline-none ${isClicked ? 'text-green-500' : 'text-black-500'}`}>
      <FontAwesomeIcon icon={faThumbsUp} />
    </button>
  );
}