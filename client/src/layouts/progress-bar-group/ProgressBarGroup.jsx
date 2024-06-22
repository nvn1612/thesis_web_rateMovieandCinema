import React from "react";
import { ProgressBar } from "../../components/progress-bar/ProgressBar";

export const ProgressBarGroup = ({
  label_1,
  label_2,
  label_3,
  label_4,
  label_5,
  label_6,
  average1,
  average2,
  average3,
  average4,
  average5,
  average6,
}) => {
  return (
    <div className="flex flex-col space-y-4 w-[700px]">
      <div className="flex flex-col space-y-3 p-5 border rounded-2xl shadow">
        <div className="flex space-x-5">
          <div className="flex flex-col space-y-2 items-center">
            <label className="font-bold ">{label_1}</label>
            <label className="font-bold">{label_2}</label>
            <label className="font-bold ">{label_3}</label>
            <label className="font-bold ">{label_4}</label>
            <label className="font-bold ">{label_5}</label>
            <label className="font-bold ">{label_6}</label>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-6 flex items-center">
              <ProgressBar percent={average1} />
            </div>
            <div className="h-6 flex items-center">
              <ProgressBar percent={average2} />
            </div>
            <div className="h-6 flex items-center">
              <ProgressBar percent={average3} />
            </div>
            <div className="h-6 flex items-center">
              <ProgressBar percent={average4} />
            </div>
            <div className="h-6 flex items-center">
              <ProgressBar percent={average5} />
            </div>
            <div className="h-6 flex items-center">
              <ProgressBar percent={average6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
