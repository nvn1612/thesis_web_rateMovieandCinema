import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { BtnRate } from "../../components/btn-rate/BtnRate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faThumbsUp,
  faFaceSmile,
  faCalculator,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { ModalRateCinema } from "../modal-rate/modal-rate-cinema/ModalRateCinema";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { ProgressBarGroup } from "../../layouts/progress-bar-group/ProgressBarGroup";
import { TotalRate } from "../../components/total-rate/TotalRate";
import { CountRate } from "../../components/count-rate/CountRate";
import { DetailRateUser } from "../../components/detail-rate-user/DetailRateUser";
import { ModalCompletedRate } from "../../components/modal-completed-rate/ModalCompletedRate";
import { BtnHelfulRate } from "../../components/btn-helpful-rate/BtnHelpfulRate";
import { Footer } from "../../layouts/footer/Footer";
import { Spinner } from "../../components/spinner/Spinner";

export const TheaterDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
  const [totalNumberRating, setTotalNumberRating] = useState(0);
  // const [isRank, setIsRank] = useState(0);
  const [likeCounts, setLikeCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsPerPage] = useState(5);

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;

  const fetchLikeCount = async (theaterRatingId) => {
    try {
      const response = await axios.get(
        `/theater-rating/get-theater-rating-like-count/${theaterRatingId}`
      );
      return response.data.likeCount;
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy số lượng lượt thích:", error);
      return 0;
    }
  };

  // useEffect(() => {
  //   const getTheatersRank = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/theater-rating/get-theater-bayes-rating/${id}`
  //       );
  //       setIsRank(response.data.bayesAverageRating);
  //     } catch (error) {
  //       console.error(
  //         "Có lỗi xảy ra khi lấy dữ liệu xếp hạng rạp chiếu phim:",
  //         error
  //       );
  //     }
  //   };

  //   getTheatersRank();
  // }, []);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`/movie-theater/gettheater/${id}`);
        setTheater(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra", error);
        setLoading(false);
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
          averageCustomerServiceRating:
            ratingsData.averageUserCustomerServiceRating,
          averageTicketPriceRating: ratingsData.averageUserTicketPriceRating,
        });

        setAverageExpertRatings({
          averageRating: ratingsData.averageExpertRating,
          averageImageQualityRating:
            ratingsData.averageExpertImageQualityRating,
          averageSoundQualityRating:
            ratingsData.averageExpertSoundQualityRating,
          averageSeatingRating: ratingsData.averageExpertSeatingRating,
          averageTheaterSpaceRating:
            ratingsData.averageExpertTheaterSpaceRating,
          averageCustomerServiceRating:
            ratingsData.averageExpertCustomerServiceRating,
          averageTicketPriceRating: ratingsData.averageExpertTicketPriceRating,
        });

        setTotalUserRatingsCount(ratingsData.totalUserRatingsCount);
        setTotalExpertRatingsCount(ratingsData.totalExpertRatingsCount);
        setTotalRating(ratingsData.totalAverageRating);
        setTotalNumberRating(ratingsData.totalNumberRating);

        const usersData = {};
        const likeCounts = {};
        await Promise.all(
          ratingsData.userRatings
            .concat(ratingsData.expertRatings)
            .map(async (rating) => {
              if (!usersData[rating.user_id]) {
                const userResponse = await axios.get(
                  `/user/getuser/${rating.user_id}`
                );
                usersData[rating.user_id] = userResponse.data;
              }
              likeCounts[rating.theater_rating_id] = await fetchLikeCount(
                rating.theater_rating_id
              );
            })
        );
        setUsers(usersData);
        setLikeCounts(likeCounts);
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra", error);
        setLoading(false);
      }
    };

    fetchTheater();
    fetchRatings();
  }, [id, isCompletedModalOpen]);

  const handleToggleRatings = (isUser) => {
    setIsUserRatings(isUser);
    setVisibleRatingsCount(5);
  };

  const handleLoadMoreRatings = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleOpenRateModal = () => {
    setIsRateModalOpen(true);
  };

  const handleCloseRateModal = () => {
    setIsRateModalOpen(false);
  };

  const handleOpenCompletedModal = () => {
    setIsCompletedModalOpen(true);
  };

  const handleCloseCompletedModal = () => {
    setIsCompletedModalOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const currentRatings = isUserRatings ? userRatings : expertRatings;
  const currentAverageRatings = isUserRatings
    ? averageUserRatings
    : averageExpertRatings;
  const currentTotalRatingsCount = isUserRatings
    ? totalUserRatingsCount
    : totalExpertRatingsCount;

  return (
    <>
      <Header />
      <div className="h-screen">
        <div className="flex min-h-[400px] bg-slate-300">
          <div className="w-2/5 h-full">
            <div className="flex justify-center items-center h-full mt-5">
              <img
                src={`/${theater.theater_logo}`}
                alt={theater.theater_name}
                className="border rounded-full w-64 h-64"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 space-y-3 w-3/5 h-full ">
            <div className="flex space-x-2 items-center">
              <p className="text-4xl font-bold uppercase">
                {theater.theater_name}
              </p>
              <p className="bg-gray-400 p-2 text-white rounded-full">
                {theater.region}
              </p>
            </div>
            <div className="flex space-x-5">
              <BtnRate onClick={handleOpenRateModal} />
              {expertRatings.length > 0 ? (
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <p>Tổng số lượng đánh giá</p>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </div>
                  <div className="flex justify-center font-bold">
                    <p>{Math.round((totalRating / 10) * 100)} %</p>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon className="text-black" icon={faCalculator} />
                  <p className="text-black">Số lượng đánh giá</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-black">{totalNumberRating}</p>
                </div>
              </div>
              {/* <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon className="text-black" icon={faFaceSmile} />
                    <p className="text-black">Xếp hạng</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">
                      {currentRatings.length === 0 ? (
                        <p className="text-black">Chưa có xếp hạng</p>
                      ) : isRank >= 7 ? (
                        <p className="text-green-500">Cao</p>
                      ) : isRank >= 5 ? (
                        <p className="text-orange-500">Trung bình</p>
                      ) : (
                        <p className="text-red-500">Thấp</p>
                      )}
                    </p>
                  </div>
                </div> */}
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
              className={`p-2 m-2 border border-black rounded-xl ${
                isUserRatings ? "bg-green-500 text-white" : ""
              }`}
            >
              Đánh giá từ khán giả
            </button>
            <button
              onClick={() => handleToggleRatings(false)}
              className={`p-2 m-2 border border-black rounded-xl ${
                !isUserRatings ? "bg-green-500 text-white" : ""
              }`}
            >
              Đánh giá từ chuyên gia
            </button>
          </div>
          {currentRatings.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-lg">Không có đánh giá nào.</p>
            </div>
          ) : (
            <div className="bg-white h-full w-2/3">
              <div className="flex flex-col items-center space-y-2 mt-3 mb-3">
                <ProgressBarGroup
                  label_1={"Chất lượng hình ảnh"}
                  label_2={"Chất lượng âm thanh"}
                  label_3={"Chỗ ngồi"}
                  label_4={"Không gian rạp"}
                  label_5={"Dịch vụ khách hàng"}
                  label_6={"Giá vé"}
                  average1={Math.round(
                    (currentAverageRatings.averageImageQualityRating / 10) * 100
                  )}
                  average2={Math.round(
                    (currentAverageRatings.averageSoundQualityRating / 10) * 100
                  )}
                  average3={Math.round(
                    (currentAverageRatings.averageSeatingRating / 10) * 100
                  )}
                  average4={Math.round(
                    (currentAverageRatings.averageTheaterSpaceRating / 10) * 100
                  )}
                  average5={Math.round(
                    (currentAverageRatings.averageCustomerServiceRating / 10) *
                      100
                  )}
                  average6={Math.round(
                    (currentAverageRatings.averageTicketPriceRating / 10) * 100
                  )}
                />
                <div className="flex space-x-1 ">
                  <TotalRate
                    totalPercent={Math.round(
                      (currentAverageRatings.averageRating / 10) * 100
                    )}
                  />
                  <CountRate
                    name={theater.theater_name}
                    userType={isUserRatings ? "khán giả" : "chuyên gia"}
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
                  {currentRatings
                    .slice(indexOfFirstRating, indexOfLastRating)
                    .map((rating, index) => (
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
                                  ? `/${users[rating.user_id].avatar}`
                                  : noAvatarUser
                              }
                              alt="User Avatar"
                            />
                            <div className="flex flex-col">
                              <div className="flex space-x-2">
                                <p>
                                  {users[rating.user_id]?.username ||
                                    "Unknown User"}
                                </p>
                                {users[rating.user_id]?.occupation ? (
                                  <p className="text-white bg-yellow-500 rounded-md pl-1 pr-1">
                                    {users[rating.user_id]?.occupation || null}
                                  </p>
                                ) : null}
                                <p>{rating.total_rating.toFixed(1)}/10</p>
                              </div>
                              {users[rating.user_id]?.occupation ? (
                                <div>
                                  <p>{users[rating.user_id]?.name}</p>
                                </div>
                              ) : null}
                              <div className="text-gray-400">
                                {new Date(
                                  rating.created_at
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            {isUserRatings &&
                              index === 0 &&
                              likeCounts[rating.theater_rating_id] >= 10 && (
                                <div>
                                  <FontAwesomeIcon
                                    className="text-yellow-500"
                                    icon={faCrown}
                                  />
                                  <span className="ml-1 p-1 bg-yellow-400 rounded-lg text-white">
                                    Đáng giá hữu ích nhất
                                  </span>
                                </div>
                              )}
                            {isUserRatings && (
                              <div>
                                <BtnHelfulRate
                                  ratingId={rating.theater_rating_id}
                                  isMovie={false}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <DetailRateUser
                          label1={"Chất lượng hình ảnh"}
                          label2={"Chất lượng âm thanh"}
                          label3={"Chỗ ngồi"}
                          label4={"Không gian rạp"}
                          label5={"Dịch vụ khách hàng"}
                          label6={"Giá vé"}
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
                {currentRatings.length > ratingsPerPage && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {Array.from(
                      {
                        length: Math.ceil(
                          currentRatings.length / ratingsPerPage
                        ),
                      },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`p-2 border rounded-xl hover:bg-gray-300 transition ${
                            currentPage === index + 1 ? "bg-gray-300" : ""
                          }`}
                        >
                          {index + 1}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <ModalRateCinema
        isOpen={isRateModalOpen}
        onClose={handleCloseRateModal}
        onCompleted={handleOpenCompletedModal}
        theaterId={theater.theater_id}
        theaterImageUrl={`/${theater.theater_logo}`}
      />
      <ModalCompletedRate
        isOpen={isCompletedModalOpen}
        onClose={handleCloseCompletedModal}
      />
    </>
  );
};
