import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import { Routes, Route } from "react-router-dom";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { MovieList } from "./movie/MovieList";
import { MovieCreate } from "./movie/MovieCreate";
import { MovieEdit } from "./movie/MovieEdit";
export const AdminPage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="sider-bar">
        <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out">
          <img className="mx-auto h-12 w-auto" src={logo} alt="" />
          <hr />
          <nav>
            <Link
              to="/"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Thống kê
            </Link>
            <Link
              to="/admin/users"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý user
            </Link>
            <Link
              to="/admin/movies"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý phim
            </Link>
            <Link
              to="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý rạp chiếu
            </Link>
            <Link
              to="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý bài viết
            </Link>
            <Link
              to="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Đăng xuất
            </Link>
          </nav>
          <hr />
        </div>
      </div>
      <div className="page-management flex-1">
        <Routes>
          <Route path="users/*" element={<UserList />} />
          <Route path="user/add" element={<UserCreate />} />
          <Route path="user/edit/:userId" element={<UserEdit />} />
          <Route path="movies/" element={<MovieList />} />
          <Route path="movies/create" element={<MovieCreate />} />
          <Route path="movies/edit/:movieId" element={<MovieEdit />} />
        </Routes>
      </div>
    </div>
  );
};
