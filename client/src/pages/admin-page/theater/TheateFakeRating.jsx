import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchInput } from '../../../components/search-input/SearchInput';
import { useNavigate } from 'react-router-dom';

export const TheaterFakeRating = () => {
  const [fakeRatings, setFakeRatings] = useState([]);
  const [users, setUsers] = useState({});
  const [theaters, setTheaters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFakeRatings = async () => {
      try {
        const response = await axios.get('/theater-rating/fake-reported-rating');
        setFakeRatings(response.data);
      } catch (error) {
        console.error('Error fetching fake ratings:', error);
      }
    };

    fetchFakeRatings();
  }, []);

  const fetchUser = async (userId) => {
    if (!users[userId]) {
      try {
        const response = await axios.get(`/user/getuser/${userId}`);
        setUsers((prevUsers) => ({ ...prevUsers, [userId]: response.data }));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  const fetchTheater = async (theaterId) => {
    if (!theaters[theaterId]) {
      try {
        const response = await axios.get(`/movie-theater/gettheater/${theaterId}`);
        setTheaters((prevTheaters) => ({ ...prevTheaters, [theaterId]: response.data }));
      } catch (error) {
        console.error('Error fetching theater:', error);
      }
    }
  };

  const handleDeleteRating = async (theaterRatingId) => {
    try {
      await axios.delete(`/theater-rating/delete-theater-rating-and-increase-suspicion/${theaterRatingId}`);
      setFakeRatings((prevRatings) => prevRatings.filter(rating => rating.theater_rating_id !== theaterRatingId));
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const handleUpdateFakeRating = async (theaterRatingId) => {
    try {
      await axios.put(`/theater-rating/update-fake-reported-rating/${theaterRatingId}`);
      
      const updatedResponse = await axios.get('/theater-rating/fake-reported-rating');
      setFakeRatings(updatedResponse.data);
    } catch (error) {
      console.error('Error updating fake rating:', error);
    }
  };

  useEffect(() => {
    fakeRatings.forEach((rating) => {
      fetchUser(rating.user_id);
      fetchTheater(rating.theater_id);
    });
  }, [fakeRatings]);
  

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <SearchInput contentSearch="Tìm kiếm người dùng"/>
              <p className="font-bold text-red-500">Danh sách các đánh giá nghi ngờ giả mạo</p>
              {fakeRatings.length > 0 && (
                <p className="font-bold">Tên rạp chiếu : {theaters[fakeRatings[0].theater_id]?.theater_name}</p>
              )}
              <div>
               
                <span className="inline-block h-3 w-3 rounded-full bg-red-200 mr-2"></span>
                <span>Đáng giá bị tố cáo giả mạo</span>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tài khoản</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng hình ảnh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chất lượng âm thanh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh giá chỗ ngồi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Không gian rạp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chát lượng giá vé</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng điểm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fakeRatings.map((rating, index) => (
                    <tr key={index} className={rating.reported ? "bg-red-100" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{users[rating.user_id]?.username || 'Unknown User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.image_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.sound_quality_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.seating_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.theater_space_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.customer_service_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.ticket_price_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rating.total_rating.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="hover:text-green-500 text-green-400 transition" onClick={() => handleUpdateFakeRating(rating.theater_rating_id)}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className="hover:text-red-500 text-red-400 transition" onClick={() => handleDeleteRating(rating.theater_rating_id)}>
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
