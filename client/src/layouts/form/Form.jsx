import React from "react";
import { BtnConfirm } from "../../components/btn-confirm/BtnConfirm";
export const Form = ({label}) => {
  return (
    <div className="flex space-x-5">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">Username</label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">Name</label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">Email</label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">Password</label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">Address</label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">
            Phone number
          </label>
          <input className="p-2 border border-black w-80 rounded-lg"></input>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-1 items-center">
            <label className="text-sm uppercase font-bold text-green-500">
              is Admin
            </label>
            <input
              type="checkbox"
              id="option1"
              name="option1"
              value="Option 1"
              className="h-5 w-5 accent-teal-600"
            />
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <label className="text-sm uppercase font-bold text-green-500">
              is Active
            </label>
            <input
              type="checkbox"
              id="option1"
              name="option1"
              value="Option 1"
              className="h-5 w-5 accent-teal-600"
            />
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <label className="text-sm uppercase font-bold text-green-500">
              is Expert
            </label>
            <input
              type="checkbox"
              id="option1"
              name="option1"
              value="Option 1"
              className="h-5 w-5 accent-teal-600"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="uppercase font-bold text-green-500">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="p-2 border border-black w-80 rounded-lg"
          ></input>
        </div>
        <div>
          <BtnConfirm label={label}/>
        </div>
      </div>
    </div>
  );
};
