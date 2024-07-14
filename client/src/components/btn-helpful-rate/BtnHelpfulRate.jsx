import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import UserContext from "../../context/UserContext";

export const BtnHelfulRate = ({ ratingId, isMovie  }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);


  const { user } = useContext(UserContext);

  const apiBase = isMovie ? '/movie-rating' : '/theater-rating';

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`${apiBase}/check-${isMovie ? 'movie' : 'theater'}-rating-like/${ratingId}`, {
            params: { user_id: user.user_id },
          });
          setIsClicked(response.data.isLiked);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${apiBase}/get-${isMovie ? 'movie' : 'theater'}-rating-like-count/${ratingId}`);
        console.log(response.data.likeCount);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeStatus();
    fetchLikeCount();
  }, [ratingId, user, apiBase]);

  const handleClick = async () => {
    try {
      if (user && user.user_id) {
        await axios.put(`${apiBase}/toggle-${isMovie ? 'movie' : 'theater'}-rating-like/${ratingId}`, {
          user_id: user.user_id,
        });
        setIsClicked(!isClicked);

        if (isClicked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button onClick={handleClick} className={`focus:outline-none ${isClicked ? 'text-green-500' : 'text-black-500'}`}>
      <FontAwesomeIcon icon={faThumbsUp} />
      <span className="pl-3">
        {isClicked ? 'Đánh giá hữu ích' : null} ({likeCount})
      </span>
    </button>
  );
};