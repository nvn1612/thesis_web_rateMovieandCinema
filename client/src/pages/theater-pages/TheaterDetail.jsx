import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../layouts/header/Header';
import { BtnRate } from '../../components/btn-rate/BtnRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap,faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ModalRateCinema } from '../modal-rate/modal-rate-cinema/ModalRateCinema';
import noAvatarUser from '../../assets/images/no_user_avatar.jpg';
import { ProgressBarGroup } from '../../layouts/progress-bar-group/ProgressBarGroup';
import { TotalRate } from '../../components/total-rate/TotalRate';
import { CountRate } from '../../components/count-rate/CountRate';
import { DetailRateUser } from '../../components/detail-rate-user/DetailRateUser';
import { ModalCompletedRate } from "../../components/modal-completed-rate/ModalCompletedRate";
import { BtnReport } from "../../components/btn-report/BtnReport";
import UserContext from "../../context/UserContext"; 


export const TheaterDetail = () => {
  const { user } = useContext(UserContext);

  const { id } = useParams();
  const [theater, setTheater] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [userRatings, setUserRatings] = useState([]);
  const [expertRatings, setExpertRatings] = useState([]);
  const [averageUserRatings, setAverageUserRatings] = useState({});
  const [averageExpertRatings, setAverageExpertRatings] = useState({});
  const [totalUserRatingsCount, setTotalUserRatingsCount] = useState(0);
  const [totalExpertRatingsCount, setTotalExpertRatingsCount] = useState(0);
  const [isUserRatings, setIsUserRatings] = useState(true);
  const [users, setUsers] = useState({});
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [visibleRatingsCount, setVisibleRatingsCount] = useState(5);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`/movie-theater/gettheater/${id}`);
        setTheater(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra', error);
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await axios.get(`/theater-rating/ratings/${id}`);
        const ratingsData = response.data;

        setUserRatings(ratingsData.userRatings);
        setExpertRatings(ratingsData.expertRatings);

        setAverageUserRatings({
          averageRating: ratingsData.averageUserRating,
          averageImageQualityRating: ratingsData.averageUserImageQualityRating,
          averageSoundQualityRating: ratingsData.averageUserSoundQualityRating,
          averageSeatingRating: ratingsData.averageUserSeatingRating,
          averageTheaterSpaceRating: ratingsData.averageUserTheaterSpaceRating,
          averageCustomerServiceRating: ratingsData.averageUserCustomerServiceRating,
          averageTicketPriceRating: ratingsData.averageUserTicketPriceRating
        });

        setAverageExpertRatings({
          averageRating: ratingsData.averageExpertRating,
          averageImageQualityRating: ratingsData.averageExpertImageQualityRating,
          averageSoundQualityRating: ratingsData.averageExpertSoundQualityRating,
          averageSeatingRating: ratingsData.averageExpertSeatingRating,
          averageTheaterSpaceRating: ratingsData.averageExpertTheaterSpaceRating,
          averageCustomerServiceRating: ratingsData.averageExpertCustomerServiceRating,
          averageTicketPriceRating: ratingsData.averageExpertTicketPriceRating
        });

        setTotalUserRatingsCount(ratingsData.totalUserRatingsCount);
        setTotalExpertRatingsCount(ratingsData.totalExpertRatingsCount);
        setTotalRating(ratingsData.totalAverageRating)

        const usersData = {};
        await Promise.all(
          ratingsData.userRatings.concat(ratingsData.expertRatings).map(async (rating) => {
            if (!usersData[rating.user_id]) {
              const userResponse = await axios.get(`/user/getuser/${rating.user_id}`);
              usersData[rating.user_id] = userResponse.data;
            }
          })
        );
        setUsers(usersData);
      } catch (error) {
        console.error('Có lỗi xảy ra', error);
      }
    };

    fetchTheater();
    fetchRatings();
  }, [id, isCompletedModalOpen]); 

  const handleToggleRatings = (isUser) => {
    setIsUserRatings(isUser);
    setVisibleRatingsCount(5);
  };

  const handleOpenRateModal = () => {
    setIsRateModalOpen(true);
  };

  const handleCloseRateModal = () => {
    setIsRateModalOpen(false);
  };

  const handleLoadMoreRatings = () => {
    setVisibleRatingsCount((prevCount) => prevCount + 5);
  };

  const handleOpenCompletedModal = () => {
    setIsCompletedModalOpen(true);
  };

  const handleCloseCompletedModal = () => {
    setIsCompletedModalOpen(false);
  };

  if (!theater) {
    return <div>Loading...</div>;
  }

  const currentRatings = isUserRatings ? userRatings : expertRatings;
  const currentAverageRatings = isUserRatings ? averageUserRatings : averageExpertRatings;
  const currentTotalRatingsCount = isUserRatings ? totalUserRatingsCount : totalExpertRatingsCount;

  return (
    <>
      <Header />
      <div className="h-[400px] bg-slate-300">
        <div className="flex h-full">
          <div className="w-2/5 h-full">
            <div className="flex justify-center items-center h-full">
              <img
                src={`/${theater.theater_logo}`}
                alt={theater.theater_name}
                className="border rounded-full w-64 h-64"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 space-y-3 w-3/5 h-full">
            <div className="flex space-x-2 items-center">
              <p className="text-4xl font-bold uppercase">{theater.theater_name}</p>
              <p className="bg-gray-400 p-2 text-white rounded-full">{theater.region}</p>
            </div>
            <div className="flex space-x-5">
               <BtnRate onClick={handleOpenRateModal} />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                      <p>Tổng đánh giá</p>
                      <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  <div className="flex justify-center font-bold">
                    <p>{Math.round((totalRating)/10*100)} %</p>
                  </div>
                </div>
            </div>
            <div className="flex space-x-2 items-center">
              <FontAwesomeIcon icon={faMap} />
              <p>{theater.address}</p>
            </div>
            <div className="w-4/5">
              <p>{theater.description}</p>
            </div>
            <div className="flex space-x-9">
              <img
                className="w-48 h-36 rounded-lg"
                src={`/${theater.theater_image_1}`}
                alt="theater image 1"
              />
              <img
                className="w-48 h-36 rounded-lg"
                src={`/${theater.theater_image_2}`}
                alt="theater image 2"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-200 min-h-screen flex justify-center">
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
          <div className="bg-white h-full w-2/3">
            <div className="flex flex-col items-center space-y-2 mt-3 mb-3">
              <ProgressBarGroup
                label_1={"Chất lượng hình ảnh"}
                label_2={"Chất lượng âm thanh"}
                label_3={"Chỗ ngồi"}
                label_4={"Không gian rạp"}
                label_5={"Dịch vụ khách hàng"}
                label_6={"Giá vé"}
                average1={Math.round(((currentAverageRatings.averageImageQualityRating) / 10) * 100)}
                average2={Math.round(((currentAverageRatings.averageSoundQualityRating) / 10) * 100)}
                average3={Math.round(((currentAverageRatings.averageSeatingRating) / 10) * 100)}
                average4={Math.round(((currentAverageRatings.averageTheaterSpaceRating) / 10) * 100)}
                average5={Math.round(((currentAverageRatings.averageCustomerServiceRating) / 10) * 100)}
                average6={Math.round(((currentAverageRatings.averageTicketPriceRating) / 10) * 100)}
              />
              <div className="flex space-x-1 ">
                <TotalRate
                  totalPercent={Math.round(((currentAverageRatings.averageRating) / 10) * 100)}
                />
                <CountRate
                  name={theater.theater_name}
                  userType={isUserRatings ? 'khán giả' : 'chuyên gia'}
                  allRate={currentTotalRatingsCount}
                  score={currentAverageRatings.averageRating}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex p-4 bg-slate-400 items-center space-x-1">
                <p>Các đánh giá của</p>
                <p>{theater.theater_name}</p>
              </div>
              <div className="flex flex-col p-2 space-y-3">
                {currentRatings.slice(0, visibleRatingsCount).map((rating) => (
                  <div
                    key={rating.theater_rating_id}
                    className="flex flex-col p-2 border rounded-md bg-slate-200 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={
                          users[rating.user_id]?.avatar
                            ? `http://localhost:8000/${users[rating.user_id].avatar}`
                            : noAvatarUser
                        }
                        alt="User Avatar"
                      />
                      <div className="flex flex-col">
                        <div className="flex space-x-2">
                          <p>{users[rating.user_id]?.username || "Unknown User"}</p>
                          <p>
                            {(rating.total_rating).toFixed(1)}/10
                          </p>
                        </div>
                        <div className="text-gray-400">
                          {new Date(rating.created_at).toLocaleDateString()}
                        </div>
                      </div>     
                    </div>
                    <div>
                        {isUserRatings && (
                          <div>
                            {user.is_expert && (
                              <BtnReport id={rating.theater_rating_id} 
                              type="theater-rating"
                              />
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                    <DetailRateUser
                      score1={rating.image_quality_rating}
                      score2={rating.sound_quality_rating}
                      score3={rating.seating_rating}
                      score4={rating.theater_space_rating}
                      score5={rating.customer_service_rating}
                      score6={rating.ticket_price_rating}
                    />
                    <div>
                      <p>{rating.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              {visibleRatingsCount < currentRatings.length && (
                <button 
                  onClick={handleLoadMoreRatings} 
                  className="p-2 m-2 border border-black rounded-xl bg-green-500 text-white"
                >
                  Xem thêm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalRateCinema
        isOpen={isRateModalOpen}
        onClose={handleCloseRateModal}
        onCompleted={handleOpenCompletedModal}
        theaterId={theater.theater_id}
        theaterImageUrl={`http://localhost:8000/${theater.theater_logo}`}
      />
       <ModalCompletedRate
        isOpen={isCompletedModalOpen} 
        onClose={handleCloseCompletedModal} 
      />
    </>
  );
};
