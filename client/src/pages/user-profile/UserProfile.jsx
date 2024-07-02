import React,{useContext} from 'react';
import { Header } from '../../layouts/header/Header';
import { BgTop } from '../../components/bg-top/BgTop';
import userBG from '../../assets/images/userBackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTheaterMasks, faPen, faSignOutAlt, faUser,faBook } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Link } from "react-router-dom";
import { UserDetail } from './UserDetail';
import UserContext from '../../context/UserContext';
import { UserRatedMovies } from './UserRatedMovies';




export const UserProfile = () => {
  
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <BgTop
        title="Trang cá nhân"
        decribe="Trang hiện thị thông tin cá nhân của bạn "
        CinemaBG={userBG}
      />
      <div className=" ml-7 mt-8 flex">
        <ul className="bg-white shadow rounded-lg divide-y divide-gray-200 self-start">
          
        <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link to="/profile/user-detail" className="flex items-center w-full">
                <FontAwesomeIcon icon={faUser} className="mr-4 text-blue-500" />
                <span className="font-medium text-gray-700">Thông tin cá nhân</span>
            </Link>
        </li>
        <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link to="/profile/user-rated-movies" className="flex items-center w-full">
                <FontAwesomeIcon icon={faFilm} className="mr-4 text-green-500" />
                <span className="font-medium text-gray-700">Phim đã đánh giá</span>
            </Link>
        </li>
        <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <Link to="/profile/user-rated-movies" className="flex items-center w-full">
                <FontAwesomeIcon icon={faTheaterMasks} className="mr-4 text-red-500" />
                <span className="font-medium text-gray-700">Rạp chiếu đã đánh giá</span>
            </Link>
        </li>
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <FontAwesomeIcon icon={faPen} className="mr-4 text-yellow-500" />
            <span className="font-medium text-gray-700">Đổi mật khẩu</span>
          </li>
          <li
            className="px-6 py-4 flex items-center cursor-pointer hover:bg-green-300 transition"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-4 text-gray-700" />
            <span className="font-medium text-gray-700">Đăng xuất</span>
          </li>
        </ul>



        <div className="flex ml-16"> 

              <Routes>
                <Route path="/user-detail" element={<UserDetail />} />
                <Route path="/user-rated-movies" element={<UserRatedMovies />} />
                {/* <Route path="movie-rating" element={<MovieRating />} />
                <Route path="theater-rating" element={<TheaterRating />} />
                <Route path="post" element={<Post />} />
                <Route path="change-password" element={<ChangePassword />} /> */}



              </Routes>


        </div>


      </div>



      
    </>
  );
};
