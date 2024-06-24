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
import { faStar } from "@fortawesome/free-solid-svg-icons";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { TotalRate } from "../../components/total-rate/TotalRate";
import { ProgressBarGroup } from "../../layouts/progress-bar-group/ProgressBarGroup";
import { CountRate } from "../../components/count-rate/CountRate";

export const MovieDetail = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [userRatings, setUserRatings] = useState([]);
  const [expertRatings, setExpertRatings] = useState([]);
  const [averageUserRatings, setAverageUserRatings] = useState({});
  const [averageExpertRatings, setAverageExpertRatings] = useState({});
  const [totalUserRatingsCount, setTotalUserRatingsCount] = useState(0);
  const [totalExpertRatingsCount, setTotalExpertRatingsCount] = useState(0);
  const [isUserRatings, setIsUserRatings] = useState(true);
  const [users, setUsers] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movie/getmovie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra", error);
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movie-rating/ratings/${id}`);
        const ratingsData = response.data;
        
        setUserRatings(ratingsData.userRatings);
        setExpertRatings(ratingsData.expertRatings);

        setAverageUserRatings({
          averageRating: ratingsData.averageUserRating,
          averageContentRating: ratingsData.averageUserContentRating,
          averageActingRating: ratingsData.averageUserActingRating,
          averageVisualEffectsRating: ratingsData.averageUserVisualEffectsRating,
          averageSoundRating: ratingsData.averageUserSoundRating,
          averageDirectingRating: ratingsData.averageUserDirectingRating,
          averageEntertainmentRating: ratingsData.averageUserEntertainmentRating
        });

        setAverageExpertRatings({
          averageRating: ratingsData.averageExpertRating,
          averageContentRating: ratingsData.averageExpertContentRating,
          averageActingRating: ratingsData.averageExpertActingRating,
          averageVisualEffectsRating: ratingsData.averageExpertVisualEffectsRating,
          averageSoundRating: ratingsData.averageExpertSoundRating,
          averageDirectingRating: ratingsData.averageExpertDirectingRating,
          averageEntertainmentRating: ratingsData.averageExpertEntertainmentRating
        });

        setTotalUserRatingsCount(ratingsData.totalUserRatingsCount);
        setTotalExpertRatingsCount(ratingsData.totalExpertRatingsCount);

        const usersData = {};
        await Promise.all(
          ratingsData.userRatings.concat(ratingsData.expertRatings).map(async (rating) => {
            if (!usersData[rating.user_id]) {
              const userResponse = await axios.get(`http://localhost:8000/user/getuser/${rating.user_id}`);
              usersData[rating.user_id] = userResponse.data;
            }
          })
        );
        setUsers(usersData);
      } catch (error) {
        console.error("Có lỗi xảy ra", error);
      }
    };

    fetchMovie();
    fetchRatings();
  }, [id]);

  const handleToggleRatings = (isUser) => {
    setIsUserRatings(isUser);
  };

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

  const currentRatings = isUserRatings ? userRatings : expertRatings;
  const currentAverageRatings = isUserRatings ? averageUserRatings : averageExpertRatings;
  const currentTotalRatingsCount = isUserRatings ? totalUserRatingsCount : totalExpertRatingsCount;

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
              <p className="text-white uppercase text-2xl font-bold mt-2">
                {movie.name_movie}
              </p>
              <div className="flex space-x-5">
                {movie.movie_genres.map((genre) => (
                  <p
                    key={genre.genre_id}
                    className="text-white p-1 bg-gray-500 rounded-xl"
                  >
                    {genre.genres.name}
                  </p>
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
                    <FontAwesomeIcon
                      className="text-white"
                      icon={faCalendarWeek}
                    />
                    <p className="text-white">Ngày khởi chiếu</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
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
      <div className="bg-gray-200 flex justify-center min-h-screen">
        <div className="absolute left-0 top-50 p-4 flex flex-col">
          <button 
            onClick={() => handleToggleRatings(true)} 
            className={`p-2 m-2 border border-black rounded-xl ${isUserRatings ? 'bg-green-500 text-white' : ''}`}
          >
            Đánh giá từ khán giả
          </button>
          <button 
            onClick={() => handleToggleRatings(false)} 
            className={`p-2 m-2 border border-black rounded-xl ${!isUserRatings ? 'bg-green-500 text-white' : ''}`}
          >
            Đánh giá từ chuyên gia
          </button>
        </div>
        <div className="w-2/3 bg-white h-full">
          <div className="flex flex-col items-center space-y-2 mt-3 mb-3">
            <ProgressBarGroup 
              label_1={"Nội dung phim"}
              label_2={"Diễn xuất"}
              label_3={"Kỹ xảo"}
              label_4={"Âm thanh"}
              label_5={"Đạo diễn"}
              label_6={"Tính giải trí"}
              average1={Math.round(((currentAverageRatings.averageContentRating)/5)*100)}
              average2={Math.round(((currentAverageRatings.averageActingRating)/5)*100)}
              average3={Math.round(((currentAverageRatings.averageVisualEffectsRating)/5)*100)}
              average4={Math.round(((currentAverageRatings.averageSoundRating)/5)*100)}
              average5={Math.round(((currentAverageRatings.averageDirectingRating)/5)*100)}
              average6={Math.round(((currentAverageRatings.averageEntertainmentRating)/5)*100)}
            />
            <div className="flex space-x-1 ">
              <TotalRate 
                totalPercent={Math.round(((currentAverageRatings.averageRating)/5)*100)}
              />
              <CountRate
                name={movie.name_movie}
                allRate={currentTotalRatingsCount}
                score={currentAverageRatings.averageRating}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex p-4 bg-slate-400 items-center space-x-1">
              <p>Các đánh giá của</p>
              <p>{movie.name_movie}</p>
            </div>
            <div className="flex flex-col p-2 space-y-3">
              {currentRatings.map((rating) => (
                <div
                  key={rating.movie_rating_id}
                  className="flex flex-col p-2 border rounded-md bg-slate-200 space-y-2"
                >
                  <div className="flex space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        users[rating.user_id]?.avatar
                          ? `http://localhost:8000/${users[rating.user_id].avatar}`
                          : noAvatarUser
                      }
                      alt="User Avatar"
                    />
                    <div className="flex flex-col">
                      <div className="flex space-x-2">
                        <p>{users[rating.user_id]?.name || "Unknown User"}</p>
                        <p>
                          <FontAwesomeIcon icon={faStar} />{" "}
                          {Math.round(rating.total_rating.toFixed(1))}
                        </p>
                      </div>
                      <div className="text-gray-400">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>{rating.comment}</p>
                  </div>
                </div>
              ))}
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
        movieId={movie.movie_id}
        movieName={movie.title}
        posterUrl={`http://localhost:8000/${movie.poster_image}`}
      />
    </>
  );
};
