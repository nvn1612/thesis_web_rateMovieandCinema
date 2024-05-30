import React from "react";
import logo from "../../assets/images/logo.png";
export const SiderBar = () => {
  return (
    <>
      <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition-transform duration-200 ease-in-out">
      <img className="mx-auto h-12 w-auto" src={logo} alt="" />
      <hr/>
        <nav>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Thống kê
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Quản lý user
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Quản lý phim
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Quản lý rạp chiếu
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Quản lý tin tức
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Quản lý bài viết
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            Đăng xuất
          </a>
        </nav>
        <hr/>
      </div>
    </>
  );
};
