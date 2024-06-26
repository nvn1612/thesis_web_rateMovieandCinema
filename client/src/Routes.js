import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { VerifySignup } from "./pages/verification-page/VerifySignup";
import { NotifySuccess } from "./pages/verification-page/NotifySuccess";
import { Home } from "./pages/home/Home";
import { ForgotPassword } from "./pages/forgot-password/ForgotPassword";
import { AdminPage } from "./pages/admin-page/AdminPage"; 
import { MovieDisplay } from "./pages/movie-pages/MovieDisplay";
import { MovieDetail } from "./pages/movie-pages/MovieDetail";
import { TheaterDisplay } from "./pages/theater-pages/TheaterDisplay";
import { TheaterDetail } from "./pages/theater-pages/TheaterDetail";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-signup" element={<VerifySignup />} />
      <Route path="/notify-success" element={<NotifySuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/page" element={<MovieDisplay />} />
      <Route path="page/movie/detail/:id" element={<MovieDetail />} />
      <Route path="/theater" element={<TheaterDisplay />} />
      <Route path="theater/detail/:id" element={<TheaterDetail />} />
    </Routes>
  );
};

export default AppRoutes;
