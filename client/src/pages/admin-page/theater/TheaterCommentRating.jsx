import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const TheaterCommentRating = () => {
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theater_rating_id } = useParams();


  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await axios.get(`/theater-rating/get-theater-rating/${theater_rating_id}`);
        setRatingData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatingData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex-grow overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhận xét</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày chỉnh sửa</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ratingData && (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{ratingData.comment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(ratingData.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(ratingData.updated_at).toLocaleDateString()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
