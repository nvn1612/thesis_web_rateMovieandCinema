import React from 'react'
export const ProgressBar = ({ percent }) => {
  const colorText = (percent) => {
    const value = parseInt(percent, 10);
    if (value >= 80) return "text-green-500";
    if (value >= 50) return "text-blue-500";
    return "text-red-500";
  };
  const bgColor = (percent) => {
    const value = parseInt(percent, 10);
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-blue-500";
    return "bg-red-500";
  };
  const textColor = colorText(percent);
  const changeBg = bgColor(percent);
  return (
    <div className="w-[500px] flex items-center space-x-3">
       <div className="h-4 w-full bg-gray-300 rounded">
        <div style={{ width: `${percent}%` }} className={`h-full ${changeBg} rounded`} />
      </div>
      <p className={`${textColor} text-lg`}>{percent}%</p>
     
    </div>
  );
}


 