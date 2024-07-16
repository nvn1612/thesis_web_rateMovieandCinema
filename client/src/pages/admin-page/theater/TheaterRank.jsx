import React, { useState, useEffect } from "react";
import axios from "axios";

export const TheaterRank = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const getTheatersRank = async () => {
      try {
        const response = await axios.get(
          "/theater-rating/get-all-theaters-bayesian-ratings"
        );
        setTheaters(response.data);
      } catch (error) {
        console.error("An error occurred while fetching theater rankings:", error);
      }
    };

    getTheatersRank();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex justify-center m-4">
              <p className="text-red-500 font-bold">Danh sách xếp hạng rạp chiếu phim</p>
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên rạp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trung bình đánh giá rạp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số đánh giá tối thiểu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trung bình đánh giá tất cả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điểm trung bình
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Xếp hạng
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {theaters.map((theater, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.theater_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.ratingsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.averageRating.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.minRatingsRequired}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.globalAverageRating.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {theater.bayesAverageRating}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {theater.bayesAverageRating >= 7 ? (
                          <p className="text-green-500">Cao</p>
                        ) : theater.bayesAverageRating >= 5 ? (
                          <p className="text-orange-500">Trung bình</p>
                        ) : (
                          <p className="text-red-500">Thấp</p>
                        )}
                      </td> */}
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
