import React from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass,faArrowRight } from "@fortawesome/free-solid-svg-icons";
export const Header = () => {
  return (
    <>
      <header className="bg-gray-800 text-white text-lg py-4 px-4 flex justify-between items-center">
        <div className="left-header-content flex space-x-5">
            <img className="mx-auto h-12 w-auto" src={logo} alt="" />
            <p className="font-bold uppercase items-center flex">
                <span className="text-yellow-500">vi</span>
                <span className="text-gray-400">ci</span>
                <span className="text-green-500">mo</span>
            </p>
            <div className="flex items-center space-x-3">
                <input className="rounded text-black flex p-1 text-sm w-64 " placeholder="Nhập tìm kiếm"/>
                <FontAwesomeIcon icon={faMagnifyingGlass} />   
            </div>
        </div>   
        <nav>
          <a href="#" className="mx-2 font-bold hover:text-green-500 transition">
            Trang chủ
          </a>
          <a href="#" className="mx-2 font-bold hover:text-green-500 transition">
            Phim
          </a>
          <a href="#" className="mx-2  font-bold hover:text-green-500 transition">
            Rạp chiếu
          </a>
          <a href="#" className="mx-2  font-bold hover:text-green-500 transition">
            Cộng đồng
          </a>
          <a href="#" className="mx-2  font-bold text-sm hover:text-green-500 transition">
            Đăng nhập
          </a>
          <button className="btn-register text-sm font-bold bg-green-600 pt-2 pb-2 pl-7 pr-10 rounded-xl">
                <div className="flex items-center space-x-3">
                    <p>Đăng kí</p>
                <FontAwesomeIcon icon={faArrowRight} />
                </div>
          </button>
        </nav>
      </header>
    </>
  );
};
