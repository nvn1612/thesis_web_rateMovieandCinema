import React from "react";
import CinemaBG from "../../assets/images/CinemaBG.jpg";
export const BgTop = ({title,decribe}) => {
  return (
    <div className="h-24 relative">
      <img src={CinemaBG} className="h-full w-full filter brightness-50 absolute top-0 left-0" />
      <div className="flex items-center h-24 absolute left-1/2 transform -translate-x-1/2 text-white">
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-lg">{title}</h2>
          </div>
          <p>{decribe}</p>
        </div>
      </div>
    </div>
  );
};