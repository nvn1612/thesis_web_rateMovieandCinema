import React from "react";
import logo from "../../assets/images/logo.png";

import { Routes, Route,Link } from "react-router-dom";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { MovieList } from "./movie/MovieList";
import { MovieCreate } from "./movie/MovieCreate";
import { MovieEdit } from "./movie/MovieEdit";
import { TheaterList } from "./theater/TheaterList";
import { TheaterCreate } from "./theater/TheaterCreate";
import { TheaterEdit } from "./theater/TheaterEdit";
import { MovieRatingList } from "./movie/MovieRatingList";
import { TheaterRatingList } from "./theater/TheaterRatingList";
import { FakeRatingMovie } from "./movie/FakeRatingMovie";
import { CommentMovie } from "./movie/CommentMovie";
import { PostList } from "./post/PostList";
import { CommentPostList } from "./post/CommentPostList";
import { ContentPost } from "./post/ContentPost";
import { UserSuspicionLever } from "./user/UserSuspicionLever";
import { TheaterCommentRating } from "./theater/TheaterCommentRating";
import { TheaterFakeRating } from "./theater/TheateFakeRating";
export const AdminPage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="sider-bar">
        <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out">
          
          <div className="flex flex-col space-y-3 items-center">
              <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" className="rounded-full h-24 w-24"></img>
              <p>Quản trị viên</p>
          </div>

          <hr />
          <nav>
            <Link
              to=""
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Thống kê
            </Link>
            <Link
              to="/admin/users"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý người dùng
            </Link>
            <Link
              to="/admin/movies"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý phim
            </Link>
            <Link
              to="/admin/theaters"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
            >
              Quản lý rạp chiếu
            </Link>
            <Link
              to="/admin/posts"
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
          <img className="mx-auto h-12 w-auto" src={logo} alt="" />
        </div>
      </div>
      <div className="page-management flex-1">
        <Routes>
          <Route path="users/" element={<UserList />} />
          <Route path="user/add" element={<UserCreate />} />
          <Route path="user/edit/:userId" element={<UserEdit />} />
          <Route path="movies/" element={<MovieList />} />
          <Route path="movies/create" element={<MovieCreate />} />
          <Route path="movies/edit/:movieId" element={<MovieEdit />} />
          <Route path="theaters/" element={<TheaterList />} />
          <Route path="theaters/add" element={<TheaterCreate/>} />
          <Route path="theaters/edit/:theaterId" element={<TheaterEdit />} />
          <Route path="movies/ratings/:movieId" element={<MovieRatingList />} />
          <Route path="theaters/ratings/:theaterId" element={<TheaterRatingList />} />
          <Route path="movies/fake-rating" element={<FakeRatingMovie />} />
          <Route path="theaters/fake-rating" element={<TheaterFakeRating />} />

          <Route path="movies/rating-comment/:movie_rating_id" element={<CommentMovie />} />
          <Route path="theaters/rating-comment/:theater_rating_id" element={<TheaterCommentRating />} />

          <Route path="posts" element={<PostList />} />
          <Route path="posts/comments/:postId" element={<CommentPostList />} />
          <Route path="posts/content/:postId" element={<ContentPost/>} />
          <Route path="users/suspicion-lever" element={<UserSuspicionLever/>} />
        </Routes>
      </div>
    </div>
  );
};
