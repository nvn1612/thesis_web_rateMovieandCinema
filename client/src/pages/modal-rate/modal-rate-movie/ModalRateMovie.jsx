import React, { useState, useContext, useEffect } from "react";
import { ImageContent } from "../../../components/image-content/ImageContent";
import { ContentModalRate } from "../../../layouts/content-modal-rate/ContentModalRate";
import { BtnConfirm } from "../../../components/btn-confirm/BtnConfirm";
import axios from "axios";
import UserContext from "../../../context/UserContext";

export const ModalRateMovie = ({
  isOpen,
  onClose,
  onCompleted,
  movieId,
  movieName,
  posterUrl,
}) => {
  const { user } = useContext(UserContext);
  const initialRatings = {
    content_rating: 0,
    acting_rating: 0,
    visual_effects_rating: 0,
    sound_rating: 0,
    directing_rating: 0,
    entertainment_rating: 0,
  };

  const [ratings, setRatings] = useState(initialRatings);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRatings(initialRatings);
      setComment("");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/movie-rating/add-rating", {
        user_id: user.user_id,
        movie_id: movieId,
        content_rating: ratings.content_rating,
        acting_rating: ratings.acting_rating,
        visual_effects_rating: ratings.visual_effects_rating,
        sound_rating: ratings.sound_rating,
        directing_rating: ratings.directing_rating,
        entertainment_rating: ratings.entertainment_rating,
        comment,
        is_expert_rating: user.is_expert,
      });
      console.log("Rating added:", response.data);
      onCompleted();
      onClose();
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
          default:
            setErrorMessage("Đã xảy ra lỗi khi đánh giá phim.");
        }
      } else {
        setErrorMessage("Đã xảy ra lỗi khi đánh giá phim.");
      }
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div className="relative w-full max-w-4xl bg-white rounded-lg">
          <div className="p-3 bg-slate-400 flex space-x-1 items-center justify-between">
            <div className="flex space-x-1">
              <p className="font-bold">Đánh Giá Phim</p>
              <p className="font-bold text-red-600">{movieName}</p>
            </div>
            <button onClick={onClose} className="text-black text-2xl">
              &times;
            </button>
          </div>
          <div className="flex p-4 justify-center">
            <p className="text-red-500">
              Bạn phải đăng nhập để đánh giá phim.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg">
        <div className="p-3 bg-slate-400 flex space-x-1 items-center justify-between">
          <div className="flex space-x-1">
            <p className="font-bold">Đánh Giá Phim</p>
            <p className="font-bold text-red-600">{movieName}</p>
          </div>
          <button onClick={onClose} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <div className="flex p-4">
          <div className="flex justify-center w-2/5">
            <ImageContent
              width="w-[200px]"
              height="h-[290px]"
              size_rounded="xl"
              image={posterUrl}
            />
          </div>
          <div className="w-3/5">
            <ContentModalRate
              ratings={ratings}
              setRatings={setRatings}
              comment={comment}
              setComment={setComment}
              isMovieRating={true}
            />
          </div>
        </div>
       
        <div className="flex justify-center mt-2 mb-4">
          <BtnConfirm label="Hoàn tất đánh giá" onClick={handleSubmit} />
        </div>
        {errorMessage && (
          <div className="flex justify-center mt-2 mb-4">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};
