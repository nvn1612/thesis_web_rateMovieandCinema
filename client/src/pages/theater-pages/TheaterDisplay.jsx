import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../layouts/header/Header';
import { BgTop } from '../../components/bg-top/BgTop';
import { Footer } from '../../layouts/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import theaterBg from '../../assets/images/CinemaBG.jpg';
import { SearchInput } from '../../components/search-input/SearchInput';
import { TheaterLeverSelect } from '../../components/select-box/TheaterLeverSelect';
import { RegionSelect } from '../../components/select-box/RegionSelect';

export const TheaterDisplay = () => {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const theatersPerPage = 10; 
  const navigate = useNavigate();

  const fetchTheaters = async () => {
    try {
      const response = await axios.get('/movie-theater/getalltheaters');
      setTheaters(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách rạp chiếu phim:', error);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleSearchTheaters = async (searchTerm) => {
    if (searchTerm === '') {
      fetchTheaters();
      return;
    }

    try {
      const response = await axios.get(`/movie-theater/search/theaters?name=${searchTerm}`);
      setTheaters(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi tìm kiếm rạp chiếu phim:', error);
    }
  };

  const renderTheaters = () => {
    const startIndex = (currentPage - 1) * theatersPerPage;
    const currentTheaters = theaters.slice(startIndex, startIndex + theatersPerPage);

    return currentTheaters.map(theater => (
      <div className="p-4 border rounded-lg mb-4 cursor-pointer" key={theater.theater_id} onClick={() => navigate(`/theaters/detail/${theater.theater_id}`)}>
        <div className="flex space-x-4 items-center">
          <img src={`/${theater.theater_logo}`} className="w-28 h-28 border rounded-full" alt={theater.theater_name} />
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-4 items-center">
              <p>{theater.theater_name}</p>
              <p className="bg-gray-300 pl-2 pr-2 text-white rounded-full">{theater.region}</p>
            </div>
            <div className="flex space-x-1 items-center">
              <FontAwesomeIcon icon={faMap} />
              <p>{theater.address}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(theaters.length / theatersPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pt-1 pl-2 pr-2 pb-1 rounded ${i === currentPage ? 'bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col flex-grow">
        <BgTop
          title="Rạp chiếu phim tại Việt Nam"
          decribe="Danh sách các rạp chiếu phim trên toàn quốc. Xem thông tin, đánh giá và xem đánh giá một cách thật tiện ích!"
          CinemaBG={theaterBg}
        />
        <div className="main-content bg-gray-200 w-full flex-grow flex flex-col items-center justify-center">
          <div className="w-3/5 h-full bg-white overflow-auto">
            <div className="flex space-x-3 mt-2 ml-2">
                <SearchInput onSearch={handleSearchTheaters} contentSearch={"Tìm kiếm theo tên rạp chiếu"}/>
                <TheaterLeverSelect/>
                <RegionSelect/>
            </div>
            <div className="flex flex-col m-4">
              {renderTheaters()}
            </div>
          </div>
          <div className="flex space-x-2 mt-4 mb-4">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
