import React from 'react'

export const CountRate = ({name,allRate,score,userType}) => {
  return (
    <div className="p-5 border shadow w-[388px] flex flex-col justify-center items-center space-y-3">
        <p>{name} nhận được {allRate} đáng giá từ {userType} với số điểm trung bình là:</p>
        <strong className="text-lg">{score}/10</strong>
    </div>  
  )
}
