import React from 'react'
import confirmRateBg from "../../assets/images/confirmRateBG.png"
export const ModalCompletedRate = () => {
  return (
    <div className=" w-96 h-60 border rounded-lg flex flex-col space-y-4 justify-center">
    <div className="flex items-center space-x-2 justify-center">
        <div><img src={confirmRateBg} alt="confirm" className="w-96 " /></div>
        <div><p className="text-green-500 text-2xl font-bold">Hệ thống đã ghi nhận lại đáng giá cả bạn. Cảm ơn bạn đã tham gia đánh giá !</p></div>
    </div>
    <div className="flex justify-center">   
        <button className="pt-2 pb-2 pl-3 pr-4 text-white bg-green-600 rounded-lg">OK</button>
    </div>
</div>
  )
}
