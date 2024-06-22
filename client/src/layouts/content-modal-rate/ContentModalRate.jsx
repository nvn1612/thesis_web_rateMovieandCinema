import React from "react";
import { StarRate } from "../../components/star-rate/StarRate";
import { InputRate } from "../../components/input-rate/InputRate";

export const ContentModalRate = ({
  ratings, 
  setRatings,
  comment,
  setComment
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <StarRate label="Nội dung phim" rating={ratings.content_rating} setRating={(rating) => setRatings(prev => ({...prev, content_rating: rating}))} />
        <StarRate label="Diễn xuất" rating={ratings.acting_rating} setRating={(rating) => setRatings(prev => ({...prev, acting_rating: rating}))} />
        <StarRate label="Kỹ xảo" rating={ratings.visual_effects_rating} setRating={(rating) => setRatings(prev => ({...prev, visual_effects_rating: rating}))} />
        <StarRate label="Âm thanh" rating={ratings.sound_rating} setRating={(rating) => setRatings(prev => ({...prev, sound_rating: rating}))} />
        <StarRate label="Đạo diễn" rating={ratings.directing_rating} setRating={(rating) => setRatings(prev => ({...prev, directing_rating: rating}))} />
        <StarRate label="Tính giải trí" rating={ratings.entertainment_rating} setRating={(rating) => setRatings(prev => ({...prev, entertainment_rating: rating}))} />
      </div>
      <div>
        <InputRate 
          label="Viết nhận xét" 
          textContent={comment} 
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
};
