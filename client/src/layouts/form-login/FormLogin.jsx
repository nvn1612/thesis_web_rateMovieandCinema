import React, { useState } from "react";
import axios from 'axios';
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        username: username,
        password: password,
      });

      if (response.data.token) {
        navigate('/home');
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-md p-8">
        <img className="mx-auto h-12 w-auto" src={logo} alt="" />
        {message && <p className="text-center text-red-500">{message}</p>}
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700"
            >
              Tài khoản
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <a href="/forgot-password" className="text-gray-400 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            Chưa có tài khoản?{" "}
            <a href="/signup" className="text-red-500 hover:underline">
              Đăng ký ngay
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};