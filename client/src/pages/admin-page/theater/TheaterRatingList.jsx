import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from "../../../components/search-input/SearchInput";
import { UserRatingSelect } from "../../../components/select-box/UserRatingSelect";
import { useParams } from 'react-router-dom';

export const TheaterRatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState('Đánh giá từ người dùng');
  const [users, setUsers] = useState({});
  const [theaters, setTheaters] = useState({});
  const { theaterId } = useParams();

  const fetchUser = async (user_id) => {
    if (!users[user_id]) {
      try {
        const response = await axios.get(`http://localhost:8000/user/getuser/${user_id}`);
        setUsers((prevUsers) => ({ ...prevUsers, [user_id]: response.data }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const fetchTheater = async (theater_id) => {
    if (!theaters[theater_id]) {
      try {
        const response = await axios.get(`http://localhost:8000/movie-theater/gettheater/${theater_id}`);
        setTheaters((prevTheaters) => ({ ...prevTheaters, [theater_id]: response.data }));
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    }
  };

  const fetchRatings = async (user) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/theater-rating/ratings/${theaterId}`);
      const ratings = user === 'Đánh giá từ người dùng' ? response.data.userRatings : response.data.expertRatings;

      await Promise.all(ratings.map(async (rating) => {
        await fetchUser(rating.user_id);
        await fetchTheater(rating.theater_id);
      }));

      setRatings(ratings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching theater ratings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(selectedUser);
  }, [selectedUser, theaterId]);

  const handleUserChange = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteRating = async (theater_rating_id) => {
    try {
      await axios.delete(`http://localhost:8000/theater-rating/delete-theater-rating/${theater_rating_id}`);
      setRatings((prevRatings) => prevRatings.filter(rating => rating.theater_rating_id !== theater_rating_id));
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <SearchInput contentSearch="Tìm kiếm người dùng"/>
              <UserRatingSelect onUserChange={handleUserChange} />
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tài khoản</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Rạp chiếu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng hình ảnh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng âm thanh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng Ghế ngồi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Không gian rạp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng giá vé</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng điểm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ratings.map((rating, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{users[rating.user_id]?.username || 'Unknown User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{theaters[rating.theater_id]?.theater_name || 'Unknown Theater'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.image_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.sound_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.seating_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.theater_space_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.customer_service_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.ticket_price_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.total_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="hover:text-red-500 transition" onClick={() => handleDeleteRating(rating.theater_rating_id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>   
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
  );
};
