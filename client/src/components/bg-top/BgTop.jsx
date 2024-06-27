import React from "react";
export const BgTop = ({title,decribe,CinemaBG}) => {
  return (
    <div className="h-28 relative">
      <img src={CinemaBG} className=" object-cover h-full w-full filter brightness-50 absolute top-0 left-0" />
      <div className="flex items-center h-24 absolute left-1/2 transform -translate-x-1/2 text-white">
        <div className="flex flex-col w-[800px]">
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-lg">{title}</h2>
          </div>
          <p>{decribe}</p>
        </div>
      </div>
    </div>
  );
};