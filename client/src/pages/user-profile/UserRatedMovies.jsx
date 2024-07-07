import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CompletedModal } from "../../components/Completed-modal/CompletedModal";
export const UserRatedMovies = () => {
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({
    movieRatings: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const { user } = useContext(UserContext);
  const userId = user.user_id;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`/user/user-ratings/${userId}`);
        if (response && response.data) {
          setRatings(response.data);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [userId]);

  const fetchRatingDetails = async (movie_rating_id) => {
    setDetailLoading(true);
    try {
      const response = await axios.get(
        `/movie-rating/get-movie-rating/${movie_rating_id}`
      );
      setSelectedRating(response.data);
    } catch (error) {
      setDetailError(error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRowClick = (movie_rating_id) => {
    fetchRatingDetails(movie_rating_id);
  };


  const handleDeleteRating = async (movie_rating_id) => {
    try {
      await axios.delete(`/movie-rating/delete-movie-rating/${movie_rating_id}`);
 
      setLoading(true);
      const response = await axios.get(`/user/user-ratings/${userId}`);
      if (response && response.data) {
        setRatings(response.data);
      }
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error deleting rating:", error);
    } finally {
      setLoading(false);
      setSelectedRating(null); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const closeModal = () => {
    setShowCompletedModal(false);
    navigate('/profile/rated-movies');
  };
  return (
    <>
    <div className="flex space-x-3">
        {detailLoading ? (
          <p>Loading details...</p>
        ) : detailError ? (
          <p>Error loading details: {detailError.message}</p>
        ) : selectedRating ? (
          <>
            <div>
              <div className="flex flex-col space-y-2">
                <img
                  src={selectedRating.movies.poster_image ? `/${selectedRating.movies.poster_image}` : null}
                  className="h-72 rounded"
                ></img>
                <div className="flex flex-col space-x-2">
                  <p className="font-bold">Nhận xét</p>
                  <textarea value={selectedRating.comment} disable className="h-32"></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-1 items-center">
                <p>Nội dung phim</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300"
                  disabled
                  value={selectedRating.content_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Diễn xuất</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-11"
                  disabled
                  value={selectedRating.acting_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Kỹ xảo</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-16"
                  disabled
                  value={selectedRating.effects_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Âm thanh</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-10"
                  disabled
                  value={selectedRating.sound_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Đạo diễn</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-11"
                  disabled
                  value={selectedRating.direction_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Tính giải trí</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-7"
                  disabled
                  value={selectedRating.entertainment_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex justify-center">
                  <button className="text-white pt-1 pr-2 pl-2 pb-1 bg-red-500 rounded-lg hover:bg-red-600 transition"
                    onClick={()=>handleDeleteRating(selectedRating.movie_rating_id)}>
                    Xóa đánh giá
                  </button>
                </div>
            </div>
          </>
        ) : (
          <p>Chọn 1 đánh giá để xem chi tiết</p>
        )}
  

      <div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tên Phim
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tổng Đáng Giá
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ratings.movieRatings.map((rating, index) => (
                      <tr
                        key={rating.id}
                        onClick={() => handleRowClick(rating.movie_rating_id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rating.movies.name_movie}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rating.total_rating}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
     {showCompletedModal && (
      <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
    )}
    </>
  );
};
