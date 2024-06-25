import React from "react";

export const InputRate = ({ label, textContent, onChange }) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-1">
            <label>{label}</label>
            <p className="text-gray-400">(Có thể bỏ trống)</p>
        </div>
        <textarea
          className="w-full h-32 p-3 border rounded shadow"
          placeholder={`${textContent}`}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};
