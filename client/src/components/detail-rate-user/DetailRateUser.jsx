import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar } from "@fortawesome/free-solid-svg-icons";
export const DetailRateUser = ({score1,score2,score3,score4,score5,score6}) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Nội dung phim
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score1}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Diễn xuất
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score2}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Kỹ xảo
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score3}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Âm thanh
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score4}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Đạo diễn
        </p>
        <div className="flex space-x-1 items-center">
          <p>{score5}</p>
          <div className="text-amber-400">
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <p className="p-1 bg-slate-300 border rounded-full text-white">
          Tính giải trí
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
