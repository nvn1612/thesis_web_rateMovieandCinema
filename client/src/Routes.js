import React from "react";
import { Routes, Route, Router } from "react-router-dom";
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
import { CompletedModal } from "./components/Completed-modal/CompletedModal";
import { ModalCompletedRate } from "./components/modal-completed-rate/ModalCompletedRate";
import { ModalAddPost } from "./components/modal-add-post/ModalAddPost";
import { CommentPostList } from "./pages/admin-page/post/CommentPostList";
import { PostDetail } from "./pages/community-page/PostDetail";
import {Home} from "./pages/home/Home";
import {ResetPassword} from "./pages/forgot-password/ResetPassword";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-signup" element={<VerifySignup />} />
      <Route path="/notify-success" element={<NotifySuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/*" element={<AdminPage />} />

        <Route path="/admin/comment-post" element={<CommentPostList />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieDisplay />} />
        <Route path="movies/movie/detail/:id" element={<MovieDetail />} />
        <Route path="/theaters" element={<TheaterDisplay />} />
        <Route path="theaters/detail/:id" element={<TheaterDetail />} />
        <Route path="/community" element={<PostDisplay />} />
        <Route path="/profile/*" element={<UserProfile />} />
        <Route path="/test" element={<ModalCompletedRate />} />
        <Route path="/community/post-detail/:postId" element={<PostDetail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
