import React from "react";
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
            <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" className="rounded-full h-24 w-24" alt="User Avatar" />
            <p>Quản trị viên</p>
          </div>
          <hr />
          <nav>
            <Link to="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý người dùng</Link>
            <Link to="/admin/movies" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý phim</Link>
            <Link to="/admin/theaters" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý rạp chiếu</Link>
            <Link to="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Quản lý bài viết</Link>
            <div  onClick={handleLogout}className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-700">Đăng xuất</div>
            
          </nav>
          <hr />
          <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="page-management flex-1">
        <Outlet />
      </div>
    </div>
  );
};
