import React, { useContext } from "react";
import { Header } from "../../layouts/header/Header";
import { BgTop } from "../../components/bg-top/BgTop";
import userBG from "../../assets/images/userBackground.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTheaterMasks,
  faPen,
  faSignOutAlt,
  faUser,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link } from "react-router-dom";
import { UserDetail } from "./UserDetail";
import { Footer } from "../../layouts/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { UserRatedMovies } from "./UserRatedMovies";
import { UserRatedTheaters } from "./UserRatedTheaters";

export const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BgTop
        title="Trang cá nhân"
        CinemaBG={userBG}
      />
      <div className=" flex-grow ml-7 mt-8 flex">
        <ul className="bg-white shadow rounded-lg divide-y divide-gray-200 self-start">
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link to="/profile/detail" className="flex items-center w-full">
              <FontAwesomeIcon icon={faUser} className="mr-4 text-blue-500" />
              <span className="font-medium text-gray-700">
                Thông tin cá nhân
              </span>
            </Link>
          </li>
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link
              to="/profile/rated-movies"
              className="flex items-center w-full"
            >
              <FontAwesomeIcon icon={faFilm} className="mr-4 text-green-500" />
              <span className="font-medium text-gray-700">
                Phim đã đánh giá
              </span>
            </Link>
          </li>
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link
              to="/profile/rated-theaters"
              className="flex items-center w-full"
            >
              <FontAwesomeIcon
                icon={faTheaterMasks}
                className="mr-4 text-red-500"
              />
              <span className="font-medium text-gray-700">
                Rạp chiếu đã đánh giá
              </span>
            </Link>
          </li>
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link to="/forgot-password" className="flex items-center w-full">
              <FontAwesomeIcon icon={faPen} className="mr-4 text-yellow-500" />
              <span className="font-medium text-gray-700">Đổi mật khẩu</span>
            </Link>
          </li>
          <li className="px-6 py-4 flex items-center cursor-pointer hover:bg-green-300 transition">
            <div className="flex items-center w-full" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="mr-4 text-gray-700"
              />
              <span className="font-medium text-gray-700">Đăng xuất</span>
            </div>
          </li>
        </ul>

        <div className="flex ml-16 flex-grow">
          <Routes>
            <Route path="/detail" element={<UserDetail />} />
            <Route path="/rated-movies" element={<UserRatedMovies />} />
            <Route path="/rated-theaters" element={<UserRatedTheaters />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
