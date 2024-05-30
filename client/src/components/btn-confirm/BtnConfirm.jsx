import React from 'react'

export const BtnConfirm = ({label}) => {
  return (
    <>
        <button className="bg-gray-900 text-white pt-2 pb-2 pl-20 pr-20  hover:bg-green-500 transition duration-200 ">
            {label}
        </button>
    </>
  )
}
