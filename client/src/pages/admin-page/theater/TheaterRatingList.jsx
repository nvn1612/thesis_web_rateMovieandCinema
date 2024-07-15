import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from "../../../components/search-input/SearchInput";
import { UserRatingSelect } from "../../../components/select-box/UserRatingSelect";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CompletedModal } from '../../../components/Completed-modal/CompletedModal';
import { Spinner } from "../../../components/spinner/Spinner";


export const TheaterRatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [theaters, setTheaters] = useState({});
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const [showCompletedModal, setShowCompletedModal] = useState(false);


  const fetchRatingsForAdmin = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/theater-rating/get-theater-ratings-for-admin/${theaterId}`);
      setRatings(response.data);

      await Promise.all(response.data.map(async (rating) => {
        await fetchUser(rating.user_id);
        await fetchTheater(rating.theater_id);
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching theater ratings:", error);
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

  const fetchTheater = async (theater_id) => {
    if (!theaters[theater_id]) {
      try {
        const response = await axios.get(`/movie-theater/gettheater/${theater_id}`);
        setTheaters((prevTheaters) => ({ ...prevTheaters, [theater_id]: response.data }));
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    }
  };

  useEffect(() => {
    fetchRatingsForAdmin();
  }, [theaterId]);



  const handleDeleteRating = async (theater_rating_id) => {
    try {
      await axios.delete(`/theater-rating/delete-theater-rating/${theater_rating_id}`);
      setRatings((prevRatings) => prevRatings.filter(rating => rating.theater_rating_id !== theater_rating_id));
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  const handleSearchRatings = async (username) => {
    if (username === '') {
      fetchRatingsForAdmin();
      return;
    }
    try {
      const response = await axios.get(`/theater-rating/search-theater-ratings-by-username?username=${username}`);
      setRatings(response.data);
      await Promise.all(response.data.map(async (rating) => {
        await fetchUser(rating.user_id);
        await fetchTheater(rating.movie_id);
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
              <SearchInput contentSearch="Tìm kiếm người dùng" onSearch={handleSearchRatings}/>
              {ratings.length > 0 && (
                <p className="font-bold">Tên rạp chiếu : {theaters[ratings[0].theater_id]?.theater_name}</p>
              )}
              <UserRatingSelect onUserChange={handleUserRatingChange} isMovie={false} theater_id={theaterId} />
            </div>
            <div className="flex-grow overflow-y-auto">
            {ratings.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Rạp chiếu chưa có đánh giá.</p>
                </div>
              ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tài khoản</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng hình ảnh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng âm thanh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng Ghế ngồi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Không gian rạp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng giá vé</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng điểm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khác</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ratings.map((rating, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{users[rating.user_id]?.username || 'Unknown User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.image_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.sound_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.seating_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.theater_space_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.customer_service_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.ticket_price_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.total_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="text-blue-400 hover:text-blue-500 transition" onClick={() => navigate(`/admin/theaters/rating-comment/${rating.theater_rating_id}`)}><FontAwesomeIcon icon={faArrowRight}/></button></td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="hover:text-red-500 transition" onClick={() => handleDeleteRating(rating.theater_rating_id)}>
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
