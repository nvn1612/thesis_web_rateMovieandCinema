import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../layouts/header/Header';
import { BtnRate } from '../../components/btn-rate/BtnRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

export const TheaterDetail = () => {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movie-theater/gettheater/${id}`);
        setTheater(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra', error);
      }
    };
    fetchTheater();
  }, [id]);

  if (!theater) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="h-96 bg-slate-300">
        <div className="flex h-full">
          <div className="w-2/5 h-full">
            <div className="flex justify-center items-center h-full">
              <img
                src={`http://localhost:8000/${theater.theater_logo}`}
                alt={theater.theater_name}
                className="border rounded-full w-64 h-64"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 space-y-3">
            <div className="flex space-x-2 items-center">
              <p className="text-4xl font-bold uppercase">{theater.theater_name}</p>
              <p className="bg-gray-400 p-2 text-white rounded-full">{theater.region}</p>
            </div>
            <BtnRate />
            <div className="flex space-x-2 items-center">
              <FontAwesomeIcon icon={faMap} />
              <p>{theater.address}</p>
            </div>
            <div className="w-3/4">
              <p>{theater.description}</p>
            </div>
            <div className="flex space-x-9">
              <img
                className="w-48 h-36 rounded-lg"
                src={`http://localhost:8000/${theater.theater_image_1}`}
                alt="theater image 1"
              />
              <img
                className="w-48 h-36 rounded-lg"
                src={`http://localhost:8000/${theater.theater_image_2}`}
                alt="theater image 2"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 h-full flex justify-center">
          <div className="bg-white h-full w-2/3">
            {/* Additional content here */}
          </div>
        </div>
      </div>
    </>
  );
};
