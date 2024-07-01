import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../../components/search-input/SearchInput";

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movie/getallmovies');
        setMovies(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu phim:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/movie/deletemovie/${id}`);
      if (response.status === 200) {
        const updatedMovies = movies.filter(movie => movie.movie_id !== id);
        setMovies(updatedMovies);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa phim:", error);
    }
  };

  const handleViewMovieRatings = (movieId) => {
    navigate(`/admin/movies/ratings/${movieId}`);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <button onClick={() => navigate('/admin/movies/create')} className="p-2 border text-white bg-green-400 rounded-lg hover:bg-green-600 transition">
                Thêm phim
                <FontAwesomeIcon className="ml-2" icon={faPlus} />
              </button>
              <SearchInput contentSearch="Tìm kiếm phim"/>
              <button className="pt-2 pb-2 pr-3 pl-3 bg-black text-white rounded-full hover:bg-green-500 transition"onClick={() => navigate('/admin/movies/fake-rating')}>Kiểm tra đánh giá nghi ngờ giả mạo</button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phim</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quốc gia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đạo diễn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày phát hành</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời lượng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đáng giá</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {movies.map((movie, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={`/${movie.poster_image}`} alt="Không có ảnh" className="w-12 h-12 object-cover " />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{movie.name_movie}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{movie.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{movie.director}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(movie.release_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{movie.duration} phút</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="hover:text-orange-500 transition" onClick={() => handleViewMovieRatings(movie.movie_id)}>Xem chi tiết</button></td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="text-red-400 hover:text-red-500 transition">
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteMovie(movie.movie_id)} />
                        </button>
                        <button className="text-blue-400 hover:text-blue-500 transition">
                          <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/admin/movies/edit/${movie.movie_id}`)} />
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
