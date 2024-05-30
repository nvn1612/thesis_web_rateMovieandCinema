import React from 'react'
import { BtnConfirm } from '../btn-confirm/BtnConfirm'
import { BtnCancel } from '../btn-cancel/BtnCancel'
export const Modal = ({label,children}) => {
  return (
    <div className="w-1/2 h-1/2 shadow">
        <h2 className="font-bold p-3 bg-gray-300">{label}</h2>
            {children}
        <div className="flex justify-center items-center space-x-10 p-7">
            <BtnConfirm label="Đăng"/>
            <BtnCancel/>
        </div>
       
    </div>  
  )
}