import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar } from "@fortawesome/free-solid-svg-icons";
export const DetailRateUser = ({score1, score2, score3, score4, score5, score6, label1, label2, label3, label4, label5, label6}) => {
  const getBgColor = (score) => {
    if (score > 8) return 'bg-green-500';
    if (score > 5) return 'bg-blue-500';
    if (score > 3) return 'bg-orange-500';
    return 'bg-red-500';
  }
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score1)} border rounded-full text-white`}>
            {label1}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score1}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score2)} border rounded-full text-white`}>
            {label2}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score2}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score3)} border rounded-full text-white`}>
            {label3}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score3}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score4)} border rounded-full text-white`}>
            {label4}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score4}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score5)} border rounded-full text-white`}>
            {label5}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score5}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className={`p-1 ${getBgColor(score6)} border rounded-full text-white`}>
            {label6}
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score6}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
    </div>
  );
};
