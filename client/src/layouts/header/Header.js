import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";

export const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white text-lg py-4 px-4 flex justify-between items-center">
      <div className="left-header-content flex space-x-5 items-center">
        <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
        <p className="font-bold uppercase flex items-center">
          <span className="text-yellow-500">vi</span>
          <span className="text-gray-400">ci</span>
          <span className="text-green-500">mo</span>
        </p>
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
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown}>
              <img
                src={user.avatar ? `http://localhost:8000/${user.avatar}` : noAvatarUser}
                alt={user.username || "No Avatar"}
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <a href="/profile" className="block px-4 py-2 hover:bg-green-200 hover:rounded-md text-sm transition">Trang cá nhân</a>
                <a href="/rated-theaters" className="block px-4 py-2 hover:bg-green-200 text-sm transition">Các đánh giá rạp chiếu</a>
                <a href="/rated-theaters" className="block px-4 py-2 hover:bg-green-200 text-sm transition">Các đánh giá Phim</a>
                <a href="/posts" className="block px-4 py-2 hover:bg-green-200 text-sm transition">Bài viết đã đăng</a>
                <a href="/rated-movies" className="block px-4 py-2 hover:bg-green-200 text-sm transition">Đổi mật khẩu</a>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 hover:bg-green-200 text-sm hover:rounded-md transition">
                  Đăng xuất
                </button>
              </div>
            )}
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
