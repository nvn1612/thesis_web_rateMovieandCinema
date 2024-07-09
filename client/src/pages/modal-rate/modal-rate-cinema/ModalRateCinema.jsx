import React, { useState, useContext, useEffect } from "react";
import { ImageContent } from "../../../components/image-content/ImageContent";
import { ContentModalRate } from "../../../layouts/content-modal-rate/ContentModalRate";
import { BtnConfirm } from "../../../components/btn-confirm/BtnConfirm";
import axios from "axios";
import UserContext from "../../../context/UserContext"; 

export const ModalRateCinema = ({ isOpen, onClose, theaterId, theaterName, theaterImageUrl, onCompleted }) => {
  const { user } = useContext(UserContext);
  const initialRatings = {
    image_quality_rating: 0,
    sound_quality_rating: 0,
    seating_rating: 0,
    theater_space_rating: 0,
    customer_service_rating: 0,
    ticket_price_rating: 0,
  };

  const [ratings, setRatings] = useState(initialRatings);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRatings(initialRatings);
      setComment("");
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/theater-rating/add-theater-rating', {
        user_id: user.user_id,
        theater_id: theaterId,
        image_quality_rating: ratings.image_quality_rating,
        sound_quality_rating: ratings.sound_quality_rating,
        seating_rating: ratings.seating_rating,
        theater_space_rating: ratings.theater_space_rating,
        customer_service_rating: ratings.customer_service_rating,
        ticket_price_rating: ratings.ticket_price_rating,
        comment,
        is_expert_rating: user.is_expert,
      });
      console.log('Rating added:', response.data);
      onCompleted(); 
      onClose()
    } catch (error) {
      console.error("Error adding rating:", error);
      if (error.response && error.response.status === 400) {
        switch (error.response.data.error_code) {
          case 'ALREADY_RATED':
            setErrorMessage("Bạn đã đánh giá bộ phim này rồi !");
            break;
          case 'MINIMUM_RATING_REQUIRED':
            setErrorMessage("Không được bỏ trống đánh giá !");
            break;
          case 'BLACKLISTED_WORDS':
            setErrorMessage("Đánh giá của bạn đang chứa những từ ngữ không đúng chuẩn mực !");
            break;
          case 'COMMENT_TOO_SHORT':
              setErrorMessage("Đánh giá của bạn có nội dung quá ngắn !");
              break; 
          default:
            setErrorMessage("Đã xảy ra lỗi khi đánh giá phim.");
        }
      } else {
        setErrorMessage("Đã xảy ra lỗi khi đánh giá phim.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-[950px] bg-white rounded-lg">
        <div className="p-3 bg-slate-400 flex space-x-1 items-center justify-between">
          <div className="flex space-x-1">
            <p className="font-bold">Đánh giá rạp chiếu phim</p>
            <p className="font-bold text-red-600">{theaterName}</p>
          </div>
          <button onClick={onClose} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <div className="flex p-4">
          {user ? (
            <>
              <div className="w-2/4 flex justify-center">
                <ImageContent
                  width="w-[200px]"
                  height="h-[290px]"
                  size_rounded="xl"
                  image={theaterImageUrl}
                />
              </div>
              <div className="w-2/4">
                <ContentModalRate 
                  ratings={ratings} 
                  setRatings={setRatings} 
                  comment={comment}
                  setComment={setComment}
                  isMovieRating={false} 
                />
                <div className="flex justify-center mt-2 mb-4">
                  <BtnConfirm label="Hoàn tất đánh giá" onClick={handleSubmit} />
                </div>
                {errorMessage && (
                  <div className="flex justify-center mt-2 mb-4">
                    <p className="text-red-500">{errorMessage}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center w-full">
                  <p className="text-red-500">Bạn phải đăng nhập để đánh giá rạp chiếu.</p>
            </div>  
          )}
        </div>
      </div>
    </div>
  );
};
