import React from "react";

export const InputRate = ({ label, textContent, onChange }) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <label>{label}</label>
        <textarea
          className="w-full h-32 p-3 border rounded shadow"
          placeholder={`${textContent}`}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};
