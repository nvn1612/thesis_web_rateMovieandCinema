import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { ReportSuccessModal } from "../Completed-modal/ReportSuccessModal";

export const BtnReport = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reportRating = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/movie-rating/report-rating/${id}`);
      console.log('Rating reported successfully:', response.data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error reporting rating:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="flex space-x-2 items-center group" onClick={() => reportRating(id)}>
        <p className="hidden group-hover:block text-red-500">
          Tố cáo đánh giá giả mạo
        </p>
        <div className="pl-3 pr-3 pt-1 pb-1 hover:bg-red-500 hover:text-white transition rounded-lg border border-black">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      </button>
      <ReportSuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
