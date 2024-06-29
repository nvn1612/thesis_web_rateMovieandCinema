import React from "react";

export const TotalRate = ({ totalPercent }) => {
  const colorText = (totalPercent) => {
    const value = parseInt(totalPercent, 10);
    if (value >= 80) return "text-green-500";
    if (value >= 60) return "text-blue-500";
    if(value >= 40)  return "text-orange-500";
    return "text-red-500";
  };
  const bgColor = (totalPercent) => {
    const value = parseInt(totalPercent, 10);
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-blue-500";
    if(value >= 40)  return "bg-orange-500";
    return "bg-red-500";
  };
  const textColor = colorText(totalPercent);
  const changeBg = bgColor(totalPercent);
  return (
    <div className="p-5 border shadow w-[300px] flex flex-col justify-center items-center space-y-3">
      <p className={`${textColor} text-5xl`}>{totalPercent}%</p>
      <div className="h-2 w-full bg-gray-300 rounded">
        <div style={{ width: `${totalPercent}%` }} className={`h-full ${changeBg} rounded`} />
      </div>
    </div>
  );
};