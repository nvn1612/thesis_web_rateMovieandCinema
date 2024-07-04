import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../../context/UserContext";

export const UserRatedTheaters = () => {
  const [ratings, setRatings] = useState({
    theaterRatings: [],
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

  const fetchRatingDetails = async (theater_rating_id) => {
    setDetailLoading(true);
    try {
      const response = await axios.get(
        `/theater-rating/get-theater-rating/${theater_rating_id}`
      );
      setSelectedRating(response.data);
    } catch (error) {
      setDetailError(error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleRowClick = (theater_rating_id) => {
    fetchRatingDetails(theater_rating_id);
  };


  const handleDeleteRating = async (theater_rating_id) => {
    try {
      await axios.delete(`/theater-rating/delete-theater-rating/${theater_rating_id}`);
 
      setLoading(true);
      const response = await axios.get(`/user/user-ratings/${userId}`);
      if (response && response.data) {
        setRatings(response.data);
      }
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

  return (
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
                  src={selectedRating.movie_theaters.theater_logo ? `/${selectedRating.movie_theaters.theater_logo}` : null}
                  className="h-72 rounded"
                ></img>
                <div className="flex flex-col space-x-2">
                  <p className="font-bold">Nhận xét</p>
                  <textarea value={selectedRating.comment} disable className="h-32"></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <p>Chất lượng hình ảnh</p>
                <input
                  className="border border-black rounded-sm w-5 ml-2  bg-slate-300"
                  disabled
                  value={selectedRating.image_quality_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Chất lượng âm thanh</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-1"
                  disabled
                  value={selectedRating.sound_quality_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Ghế ngồi</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-[91px]"
                  disabled
                  value={selectedRating.seating_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Không gian rạp</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-12"
                  disabled
                  value={selectedRating.theater_space_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Dịch vụ khách hàng</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-4"
                  disabled
                  value={selectedRating.customer_service_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex items-center">
                <p>Giá vé</p>
                <input
                  className="border border-black rounded-sm w-5 bg-slate-300 ml-28"
                  disabled
                  value={selectedRating.ticket_price_rating || 0}
                ></input>
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 ml-1"
                ></FontAwesomeIcon>
              </div>
              <div className="flex justify-center">
                  <button className="text-white pt-1 pr-2 pl-2 pb-1 bg-red-500 rounded-lg hover:bg-red-600 transition"
                    onClick={()=>handleDeleteRating(selectedRating.theater_rating_id)}>
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Trạng Thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ratings.theaterRatings.map((rating, index) => (
                      <tr
                        key={rating.id}
                        onClick={() => handleRowClick(rating.theater_rating_id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rating.movie_theaters.theater_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rating.total_rating}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rating.fake_rating ? (
                              <p className="text-red-500">Chưa xác thực</p>
                            ) : (
                              <p className="text-green-500">Đã xác thực</p>
                            )}
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
  );
};
