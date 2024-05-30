import React from 'react'
export const ProgressBar = ({ percent }) => {
    const getBgColor = (percent) =>{
            const value = parseInt(percent,10);
            if(value >= 80) return "bg-green-500";
            if(value >= 50) return "bg-blue-500";
            return "bg-red-500";
        }
        const bgColor = getBgColor(percent);
  return (
    <div className="h-4 bg-gray-300 rounded w-[500px]">
      <div
        style={{ width: percent }}
        className={`h-full ${bgColor} rounded`}
      />
    </div>
  )
}


 