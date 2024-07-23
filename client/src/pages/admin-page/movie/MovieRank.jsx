import React, { useState, useEffect } from "react";
import axios from "axios";

export const MovieRank = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMoviesRank = async () => {
      try {
        const response = await axios.get(
          "/movie-rating/get-all-movies-bayesian-ratings"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu xếp hạng phim:", error);
      }
    };

    getMoviesRank();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex justify-center m-4">
              <p className="text-red-500 font-bold">Danh sách xếp hạng phim</p>
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200  max-w-none table-fixed">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên phim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Số đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Trung bình đánh giá phim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Số đánh giá tối thiểu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Trung bình đánh giá tất cả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Trung bình điểm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                      Xếp hạng
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {movies.map((movie, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.name_movie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.ratingsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.averageRating.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.minRatingsRequired}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.globalAverageRating.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.bayesAverageRating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie.bayesAverageRating >= 7 ? (
                          <p className="text-green-500">Cao</p>
                        ) : movie.bayesAverageRating >= 5 ? (
                          <p className="text-orange-500">Trung bình</p>
                        ) : (
                          <p className="text-red-500">Thấp</p>
                        )}
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
