import React from 'react';
import { Header } from '../../layouts/header/Header';
import { BgTop } from '../../components/bg-top/BgTop';
import userBG from '../../assets/images/userBackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTheaterMasks, faPen, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

export const UserProfile = () => {
 

  return (
    <>
      <Header />
      <BgTop
        title="Thông tin cá nhân"
        CinemaBG={userBG}
      />
      <div className=" ml-7 mt-8 flex">
        <ul className="bg-white shadow rounded-lg divide-y divide-gray-200 self-start">
          <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <FontAwesomeIcon icon={faUser} className="mr-4 text-blue-500" />
            <span className="font-medium text-gray-700">Thông tin cá nhân</span>
          </li>
          {/* <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <FontAwesomeIcon icon={faFilm} className="mr-4 text-green-500" />
            <span className="font-medium text-gray-700">Phim đã đánh giá</span>
          </li> */}
          {/* <li className="px-6 py-4 flex items-center hover:bg-green-300 transition">
            <FontAwesomeIcon icon={faTheaterMasks} className="mr-4 text-red-500" />
            <span className="font-medium text-gray-700">Rạp chiếu đã đánh giá</span>
          </li> */}
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

        <div className="ml-8 flex flex-col space-y-3 items-center">
          <img className="rounded-full w-44 h-44"src="https://play-lh.googleusercontent.com/jA5PwYqtmoFS7StajBe2EawN4C8WDdltO68JcsrvYKSuhjcTap5QMETkloXSq5soqRBqFjuTAhh28AYrA6A"></img>
          <div className="flex justify-center font-bold"><p>Khán giả</p></div>
          <div className="flex justify-center"><p className="text-green-400">Tài khoản đã được kích hoạt !</p></div>
        </div>


        <form className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4 flex space-x-3">
        <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tên tài khoản
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
      
      <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /> 
      </div>
      </div>
        
      <div className="mb-4 flex space-x-3">
        <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
          Tên người dùng
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
    
      <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Địa chỉ
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      </div>
      <div className="mb-4 flex space-x-3">
        <div className="flex flex-col">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
          Số điện thoại
        </label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        {/* <div className="flex items-center justify-center pt-6">
          <button className=" pt-1 pl-3 pr-3 pb-1 border border-black rounded-full hover:bg-green-400 hover:text-white transition hover:border-none">Xác thực số điện thoại</button>

        </div> */}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
          Ảnh đại diện
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
        >
          Cập nhập thông tin
        </button>
      </div>
    </form>




      </div>



      
    </>
  );
};
