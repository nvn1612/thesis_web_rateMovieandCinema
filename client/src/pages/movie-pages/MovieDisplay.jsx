import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { BgTop } from "../../components/bg-top/BgTop";
import { Footer } from "../../layouts/footer/Footer";
import { useNavigate } from "react-router-dom";
import movieBG from "../../assets/images/bgmovie.jpg";
import { GenreSelect } from "../../components/select-box/GenreSelect";
import { CountrySelect } from "../../components/select-box/CountrySelect";
import { MovieLeverSelect } from "../../components/select-box/MovieLeverSelect";
export const MovieDisplay = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 16;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/movie/getallmovies"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra", error);
      }
    };
    fetchMovies();
  }, []);

  const renderMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);
    const rows = [];

    for (let i = 0; i < currentMovies.length; i += 4) {
      rows.push(
        <div className="row flex space-x-10" key={i}>
          {currentMovies.slice(i, i + 4).map((movie) => (
            <div
              className="card-movie flex flex-col w-48 h-80 border rounded-lg"
              key={movie.movie_id}
              onClick={() => navigate(`movie/detail/${movie.movie_id}`)}
            >
              <img
                src={`http://localhost:8000/${movie.poster_image}`}
                alt={movie.name_movie}
                className="h-4/5 w-full border rounded-lg object-fill"
              />
              <div className="flex flex-col m-1">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  {movie.name_movie}
                </p>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pt-1 pl-2 pr-2 pb-1 rounded ${
            i === currentPage
              ? "bg-gray-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
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
          title="Phim chiếu rạp"
          decribe="Danh sách các phim chiếu rạp trên toàn quốc. Xem thông tin, đánh giá và xem đánh giá một cách thật tiện ích !"
          CinemaBG={movieBG}
        />
        <div className="main-content bg-gray-200 w-full flex-grow flex flex-col items-center justify-center">

          <div className="w-2/3 h-full bg-white overflow-auto">
           <div className="flex space-x-3">
              <GenreSelect />
              <CountrySelect />
              <MovieLeverSelect/>
           </div>
            <div className="column flex flex-col space-y-10 mt-4 ml-16 mb-4">
              {renderMovies()}
            </div>
          </div>
          <div className="flex space-x-2 mt-4 mb-4">{renderPageNumbers()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
