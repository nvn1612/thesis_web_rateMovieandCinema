import React, {useContext} from "react";
import logo from "../../assets/images/logo.png";
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const AdminPage = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };  

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="sider-bar">
        <div className="h-screen bg-gray-800 text-white w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out">
          <div className="flex flex-col space-y-3 items-center">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
              <p className="font-bold uppercase flex items-center">
                <span className="text-yellow-500">vi</span>
                <span className="text-gray-400">ci</span>
                <span className="text-green-500">mo</span>
              </p>
          </div>
          <hr />
          <nav>
            <Link to="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Thống kê</Link>
            <Link to="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý người dùng</Link>
            <Link to="/admin/movies" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý phim</Link>
            <Link to="/admin/theaters" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý rạp chiếu phim</Link>
            <Link to="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý bài viết</Link>
            <div  onClick={handleLogout}className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Đăng xuất</div>
          </nav>
          <hr />
        </div>
      </div>
      <div className="page-management flex-1 overflow-x-auto ">
        <Outlet />
      </div>
    </div>
  );
};
