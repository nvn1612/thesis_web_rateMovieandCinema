import React from 'react'

export const BtnSwitch = ({label}) => {
  return (
    <button className="bg-white text-black border-2 border-green-500 hover:bg-gray-900 hover:text-white transition ease-in-out duration-500 w-full p-6">
        {label}
    </button>
  )
}
