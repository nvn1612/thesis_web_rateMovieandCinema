import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from "../../../components/search-input/SearchInput";
import { UserRatingSelect } from "../../../components/select-box/UserRatingSelect";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CompletedModal } from '../../../components/Completed-modal/CompletedModal';
import { Spinner } from "../../../components/spinner/Spinner";

export const MovieRatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState('Đánh giá từ người dùng');
  const [users, setUsers] = useState({});
  const [movies, setMovies] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [showCompletedModal, setShowCompletedModal] = useState(false);


  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/movie-rating/get-movie-ratings-for-admin/${movieId}`);
      setRatings(response.data);

      await Promise.all(response.data.map(async (rating) => {
        await fetchUser(rating.user_id);
        await fetchMovie(rating.movie_id);
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie ratings:", error);
      setLoading(false);
    }
  };

  const fetchUser = async (user_id) => {
    if (!users[user_id]) {
      try {
        const response = await axios.get(`/user/getuser/${user_id}`);
        setUsers((prevUsers) => ({ ...prevUsers, [user_id]: response.data }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const fetchMovie = async (movie_id) => {
    if (!movies[movie_id]) {
      try {
        const response = await axios.get(`/movie/getmovie/${movie_id}`);
        setMovies((prevMovies) => ({ ...prevMovies, [movie_id]: response.data }));
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [movieId]);

    // const handleUserChange = (user) => {
    //   setSelectedUser(user);
    // };

  const handleDeleteRating = async (movie_rating_id) => {
    try {
      await axios.delete(`/movie-rating/delete-movie-rating/${movie_rating_id}`);
      setRatings((prevRatings) => prevRatings.filter(rating => rating.movie_rating_id !== movie_rating_id));
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  const handleSearchRatings = async (username) => {
    if (username === '') {
      fetchRatings();
      return;
    }
    try {
      const response = await axios.get(`/movie-rating/search-movie-ratings-by-username?username=${username}&movieId=${movieId}`);
      setRatings(response.data);
      await Promise.all(response.data.map(async (rating) => {
        await fetchUser(rating.user_id);
        await fetchMovie(rating.movie_id);
      }));
    } catch (error) {
      console.error("Error searching ratings:", error);
    }
  };

  const handleUserRatingChange = (ratings) => {
    setRatings(ratings);
  };

  if (loading) {
    return <Spinner />;
  }
  const closeModal = () => {
    setShowCompletedModal(false);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <SearchInput contentSearch="Tìm kiếm người dùng" onSearch={handleSearchRatings} />
              {ratings.length > 0 && (
                <p className="font-bold">Tên phim : {movies[ratings[0].movie_id]?.name_movie}</p>
              )}
              <UserRatingSelect selectedUser={selectedUser} onUserChange={handleUserRatingChange} isMovie={true} movie_id={movieId}/>
            </div>
            <div className="flex-grow overflow-y-auto">
            {ratings.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Phim chưa có đánh giá.</p>
                </div>
              ) : (
              <table className="min-w-full divide-y divide-gray-200 max-w-none table-fixed">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tài khoản</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Nội dung phim</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Diễn xuất</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Kỹ xảo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Âm thanh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Đạo diễn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Tính giải trí</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">Tổng điểm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khác</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ratings.map((rating, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{users[rating.user_id]?.username || 'Unknown User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.content_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.acting_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.visual_effects_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.sound_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.directing_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.entertainment_rating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.total_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="text-blue-400 hover:text-blue-500 transition" onClick={() => navigate(`/admin/movies/rating-comment/${rating.movie_rating_id}`)}><FontAwesomeIcon icon={faArrowRight}/></button></td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="hover:text-red-500 transition" onClick={() => handleDeleteRating(rating.movie_rating_id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>   
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {showCompletedModal && (
          <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
        )}
    </div>
  );
};
