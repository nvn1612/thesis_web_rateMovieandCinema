import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const BtnRate = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="p-2 rounded-xl bg-white w-28 hover:bg-green-500 transition hover:text-white">
        <div className="space-x-2 flex items-center">
          <FontAwesomeIcon icon={faStar} />
          <p>Đáng giá</p>
        </div>
      </div>
    </button>
  );
};
