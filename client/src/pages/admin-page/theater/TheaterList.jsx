import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from "../../../components/search-input/SearchInput";

export const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movie-theater/getalltheaters');
        setTheaters(response.data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    fetchTheaters();
  }, []);

  const handleDeleteTheater = async (theater_id) => {
    try {
      await axios.delete(`http://localhost:8000/movie-theater/deletetheater/${theater_id}`);
      setTheaters(theaters.filter(theater => theater.theater_id !== theater_id));
    } catch (error) {
      console.error('Có lỗi khi xóa rạp chiếu:', error);
    }
  };
  const handleViewTheaterRatings = (theaterId) => {
    navigate(`/admin/theaters/ratings/${theaterId}`);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              
              <button
                onClick={() => navigate("/admin/theaters/add")}
                className="p-2 border text-white bg-green-400 rounded-lg hover:bg-green-500 transition"
              >
                Thêm rạp chiếu
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </button>
              <SearchInput contentSearch="Tìm kiếm rạp chiếu"/>
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ảnh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên rạp chiếu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Địa chỉ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khu vực
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đáng giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chức năng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {theaters.map((theater, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={theater.theater_logo ? `http://localhost:8000/${theater.theater_logo}` : 'Không có ảnh'}
                          alt="Không có ảnh"
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.theater_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="hover:text-orange-500 transition"onClick={() =>handleViewTheaterRatings(theater.theater_id)}>Xem chi tiết</button></td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="text-red-400 hover:text-red-500 transition">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDeleteTheater(theater.theater_id)}
                          />
                        </button>
                        <button className="text-blue-400 hover:text-blue-500">
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => navigate(`/admin/theaters/edit/${theater.theater_id}`)}
                          />
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
