import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { VerifySignup } from "./pages/verification-page/VerifySignup";
import { NotifySuccess } from "./pages/verification-page/NotifySuccess";
import { ForgotPassword } from "./pages/forgot-password/ForgotPassword";
import { AdminPage } from "./pages/admin-page/AdminPage";
import { MovieDisplay } from "./pages/movie-pages/MovieDisplay";
import { MovieDetail } from "./pages/movie-pages/MovieDetail";
import { TheaterDisplay } from "./pages/theater-pages/TheaterDisplay";
import { TheaterDetail } from "./pages/theater-pages/TheaterDetail";
import { PostDisplay } from "./pages/community-page/PostDisplay";
import { UserProfile } from "./pages/user-profile/UserProfile";
import { CommentPostList } from "./pages/admin-page/post/CommentPostList";
import { Home } from "./pages/home/Home";
import { ResetPassword } from "./pages/forgot-password/ResetPassword";
import { UserList } from "./pages/admin-page/user/UserList";
import { UserCreate } from "./pages/admin-page/user/UserCreate";
import { UserEdit } from "./pages/admin-page/user/UserEdit";
import { MovieList } from "./pages/admin-page/movie/MovieList";
import { MovieCreate } from "./pages/admin-page/movie/MovieCreate";
import { MovieEdit } from "./pages/admin-page/movie/MovieEdit";
import { TheaterList } from "./pages/admin-page/theater/TheaterList";
import { TheaterCreate } from "./pages/admin-page/theater/TheaterCreate";
import { TheaterEdit } from "./pages/admin-page/theater/TheaterEdit";
import { MovieRatingList } from "./pages/admin-page/movie/MovieRatingList";
import { TheaterRatingList } from "./pages/admin-page/theater/TheaterRatingList";
import { CommentMovie } from "./pages/admin-page/movie/CommentMovie";
import { TheaterCommentRating } from "./pages/admin-page/theater/TheaterCommentRating";
import { PostList } from "./pages/admin-page/post/PostList";
import { ContentPost } from "./pages/admin-page/post/ContentPost";
import { useUser } from "./context/UserContext";
import { MovieRank } from "./pages/admin-page/movie/MovieRank";
import {TheaterRank} from "./pages/admin-page/theater/TheaterRank";
import { PostDetail } from "./pages/community-page/PostDetail";
const PrivateRoute = ({ element: Element, is_admin_route, ...rest }) => {
  const { user } = useUser();

  if (!user) {
      return <Navigate to="/login" />;
  }

  if (is_admin_route && !user.is_Admin) {
      return <Navigate to="/" />;  
  }

  return <Element {...rest} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-signup" element={<VerifySignup />} />
      <Route path="/notify-success" element={<NotifySuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<MovieDisplay />} />
      <Route path="/movies/movie/detail/:id" element={<MovieDetail />} />
      <Route path="/theaters" element={<TheaterDisplay />} />
      <Route path="/theaters/detail/:id" element={<TheaterDetail />} />
      <Route path="/community" element={<PostDisplay />} />
      <Route path="/community/post-detail/:postId" element={<PostDetail />} />
      <Route path="/profile/*" element={<UserProfile />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/admin/*" element={<PrivateRoute element={AdminPage} is_admin_route={true} />}>
        <Route path="users" element={<UserList />} />
        <Route path="user/add" element={<UserCreate />} />
        <Route path="user/edit/:userId" element={<UserEdit />} />
        <Route path="movies" element={<MovieList />} />
        <Route path="movies/create" element={<MovieCreate />} />
        <Route path="movies/edit/:movieId" element={<MovieEdit />} />
        <Route path="theaters" element={<TheaterList />} />
        <Route path="theaters/add" element={<TheaterCreate />} />
        <Route path="theaters/edit/:theaterId" element={<TheaterEdit />} />
        <Route path="movies/ratings/:movieId" element={<MovieRatingList />} />
        <Route path="theaters/ratings/:theaterId" element={<TheaterRatingList />} />
        <Route path="movies/rating-comment/:movie_rating_id" element={<CommentMovie />} />
        <Route path="theaters/rating-comment/:theater_rating_id" element={<TheaterCommentRating />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/comments/:postId" element={<CommentPostList />} />
        <Route path="posts/content/:postId" element={<ContentPost />} />
        <Route path="movies/rank" element={<MovieRank />} />
        <Route path="theaters/rank" element={<TheaterRank />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
