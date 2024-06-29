import React from 'react';
import confirmRateBg from "../../assets/images/confirmRateBG.png";

export const ReportSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-96 h-60 border rounded-lg flex flex-col space-y-4 justify-center bg-white p-4">
        <div className="flex items-center space-x-2 justify-center">
          <img src={confirmRateBg} alt="confirm" className="w-24" />
          <p className="text-green-500 text-xl font-bold">
              Cảm ơn bạn đã báo cáo đánh giá giả mạo. Hệ thống sẽ kiểm tra đáng giá này !
          </p>
        </div>
        <div className="flex justify-center">   
          <button onClick={onClose} className="pt-2 pb-2 pl-3 pr-4 text-white bg-green-600 rounded-lg">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
