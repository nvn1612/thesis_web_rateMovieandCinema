import {React,useState} from "react";
import axios from 'axios';
import logo from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom"
import { Spinner } from "../../components/spinner/Spinner";
export const FormSignup = () => {
  const [message, setMessage] = useState(null);
  const [isloading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Email không hợp lệ, vui lòng thử lại.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp, vui lòng thử lại.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/user/register', {
        email,
        username,
        password,
      });
      if (response.status === 201) {
        navigate('/verify-signup');
      } else {
        setMessage('Đăng ký không thành công, vui lòng thử lại.');
      }
    } catch (error) {
      setMessage('Đăng ký không thành công, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };
    
 

  return (
    <div class="w-full max-w-lg">
      <div class="bg-white shadow-md rounded-md p-8">
        <img class="mx-auto h-12 w-auto" src={logo} alt="" />
        {message && <div class="text-center text-red-500">{message}</div>}
        <form class="space-y-6 mt-4" action="#" method="POST" onSubmit={handleSubmit}>
          <div class="flex justify-between items-center">
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div class="mt-1">
                <input
                  name="email"
                  type="email-address"
                  autocomplete="email-address"
                  required
                  class="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Tên tài khoản
              </label>
              <div class="mt-1">
                <input
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  class="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="password"
                  required
                  class="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Nhập lại mật khẩu
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="password"
                  required
                  class="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >

              {isloading ? (
              <Spinner /> 
            ) : (
              "Đăng kí"
            )}
            </button>
          </div>
          <div class="mt-4 text-center">
            Đã có tài khoản?{" "}
            <a href="/login" class="text-red-500 hover:underline">
              Đăng nhập ngay
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};