import React from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
  };

  return (
    <header className="bg-gray-800 text-white text-lg py-4 px-4 flex justify-between items-center">
      <div className="left-header-content flex space-x-5 items-center">
        <img className="mx-auto h-12 w-auto" src={logo} alt="" />
        <p className="font-bold uppercase flex items-center">
          <span className="text-yellow-500">vi</span>
          <span className="text-gray-400">ci</span>
          <span className="text-green-500">mo</span>
        </p>
        <div className="flex items-center space-x-3">
          <input
            className="rounded text-black p-1 text-sm w-64"
            placeholder="Nhập tìm kiếm"
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      <nav className="flex items-center space-x-4">
        <a href="#" className="mx-2 font-bold hover:text-green-500 transition">
          Trang chủ
        </a>
        <a href="/page" className="mx-2 font-bold hover:text-green-500 transition">
          Phim
        </a>
        <a href="/theater" className="mx-2 font-bold hover:text-green-500 transition">
          Rạp chiếu
        </a>
        <a href="/community" className="mx-2 font-bold hover:text-green-500 transition">
          Cộng đồng
        </a>
        {user ? (
          <div className="flex items-center space-x-4">
            {user.avatar && (
              <img
                src={`http://localhost:8000/${user.avatar}`}
                alt={user.username}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span>{user.username}</span>
            <button 
              onClick={handleLogout} className="mx-2 font-bold text-sm hover:text-red-500 transition">
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="mx-2 font-bold text-sm hover:text-green-500 transition"
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => navigate('/signup')}
            className="btn-register text-sm font-bold bg-green-600 pt-2 pb-2 pl-7 pr-10 rounded-xl">
              <div className="flex items-center space-x-3">
                <p>Đăng kí</p>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
