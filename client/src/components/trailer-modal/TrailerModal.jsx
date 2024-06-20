import React from 'react'

export const TrailerModal = ({ trailerUrl, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div className="relative w-full max-w-3xl bg-white rounded-lg">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-black text-2xl"
          >
            &times;
          </button>
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src={trailerUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
