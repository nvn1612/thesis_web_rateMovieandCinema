import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import confirmBG from "../../assets/images/confirmBG.png"
export const CompletedModal = () => {
  return (
    <div className=" w-80 h-60 border rounded-lg flex flex-col space-y-4 justify-center">
        <div className="flex items-center space-x-2 justify-center">
            <div><img src={confirmBG} alt="confirm" className="w-10 h-10" /></div>
            <div><p className="text-green-500 text-2xl font-bold">Đã hoàn thành</p></div>
            <div className="text-green-400 text-2xl"><FontAwesomeIcon icon={faCheck} /></div>
        </div>
        <div className="flex justify-center">   
            <button className="pt-2 pb-2 pl-3 pr-4 text-white bg-green-600 rounded-lg">OK</button>
        </div>
    </div>
  )
}
