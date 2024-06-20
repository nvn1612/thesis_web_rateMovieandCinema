import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { Footer } from "../../layouts/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faClock } from "@fortawesome/free-solid-svg-icons";
import { BtnRate } from "../../components/btn-rate/BtnRate";
import { TrailerModal } from "../../components/trailer-modal/TrailerModal";
import { ModalRateMovie } from "../modal-rate/modal-rate-movie/ModalRateMovie";

export const MovieDetail = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movie/getmovie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  const handleOpenRateModal = () => {
    setIsRateModalOpen(true);
  };

  const handleCloseRateModal = () => {
    setIsRateModalOpen(false);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="main-content min-h-96 relative">
        <img
          src={`http://localhost:8000/${movie.backdrop_image}`}
          alt="Movie Poster"
          className="absolute inset-0 w-full h-full object-fill"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="image-wrapper flex absolute inset-0">
          <div className="w-1/3 flex justify-center items-center">
            <div className="w-52 h-72">
              <img
                className="image-poster w-full h-full border-2 rounded-3xl"
                src={`http://localhost:8000/${movie.poster_image}`}
                alt="Poster"
              />
            </div>
          </div>
          <div className="w-2/3 flex">
            <div className="flex flex-col space-y-2">
              <p className="text-white uppercase text-2xl font-bold mt-2">{movie.name_movie}</p>
              <div className="flex space-x-5">
                {movie.movie_genres.map((genre) => (
                  <p key={genre.genre_id} className="text-white p-1 bg-gray-500 rounded-xl">{genre.genres.name}</p>
                ))}
              </div>
              <p className="text-white w-4/5">{movie.description}</p>
              <div className="flex space-x-4">
                <BtnRate onClick={handleOpenRateModal} />
                <button
                  onClick={handleOpenTrailer}
                  className="p-2 border rounded-xl hover:bg-white group transition"
                >
                  <p className="text-white group-hover:text-black">Trailer</p>
                </button>
              </div>
              <div className="flex space-x-5">
                <div className="flex flex-col">
                  <p className="text-white">Đạo diễn</p>
                  <p className="text-red-600">{movie.director}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-white">Quốc gia</p>
                  <p className="text-red-600">{movie.country}</p>
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon className="text-white" icon={faCalendarWeek} />
                    <p className="text-white">Ngày khởi chiếu</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">{new Date(movie.release_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon className="text-white" icon={faClock} />
                    <p className="text-white">Thời lượng</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">{movie.duration} phút</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrailerModal
        trailerUrl={`https://www.youtube.com/embed/${movie.trailer_link}`}
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
      />
      <ModalRateMovie
        isOpen={isRateModalOpen}
        onClose={handleCloseRateModal}
        movieName={movie.name_movie}
        posterUrl={`http://localhost:8000/${movie.poster_image}`}
      />
      <Footer />
    </>
  );
};
