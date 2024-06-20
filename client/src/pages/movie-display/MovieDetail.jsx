import React, { useState } from "react";
import { Header } from "../../layouts/header/Header";
import { Footer } from "../../layouts/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek, faClock } from "@fortawesome/free-solid-svg-icons";
import { BtnRate } from "../../components/btn-rate/BtnRate";
import { TrailerModal } from "../../components/trailer-modal/TrailerModal";

export const MovieDetail = () => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <>
      <Header />
      <div className="main-content min-h-96 relative">
        <img
          src="https://simg.zalopay.com.vn/travel/2024/movie/vay-ham-ke-trung-phat-round-up-punishment-Ht5eDcd7p3gr.jpg"
          alt="Movie Poster"
          className="absolute inset-0 w-full h-full object-fill"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="image-wrapper flex absolute inset-0">
          <div className="w-1/3 flex justify-center items-center">
            <div className="w-52 h-72">
              <img
                className="image-poster w-full h-full border-2 rounded-3xl"
                src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/4/0/406x600-roundup.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-2/3 flex">
            <div className="flex flex-col space-y-2">
              <p className="text-white uppercase text-2xl font-bold mt-2">Vây Hãm: Kẻ Trừng Phạt</p>
              <div className="flex space-x-5">
                <p className="text-white p-1 bg-gray-500 rounded-xl">Hành động</p>
                <p className="text-white p-1 bg-gray-500 rounded-xl">Phiêu lưu</p>
              </div>
              <p className="text-white w-4/5">Nội dung phim xoay quanh cuộc điều tra của "Monster Cop" Ma Seok Do và đội của anh ấy khi họ phát hiện mối liên hệ giữa nhà phát triển một ứng dụng mua bán ma túy đã bị sát hại ở Philippines và một tổ chức cá cược trực tuyến bất hợp pháp. Nhân vật chính là Baek Chang Ki, người đang kiểm soát thị trường cá cược trực tuyến bất hợp pháp của Hàn Quốc và gây ra bạo lực, bắt cóc và giết người.</p>
              <div className="flex space-x-4">
                <BtnRate />
                <button
                  onClick={handleOpenTrailer}
                  className="p-2 border rounded-xl hover:bg-white group transition"
                >
                  <p className="text-white group-hover:text-black">Trailer</p>
                </button>
              </div>
              <div className="flex space-x-5">
                <div className="flex flex-col">
                  <p className="text-white">Đạo diễn</p>
                  <p className="text-red-600">Heo Myung haeng</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-white">Quốc gia</p>
                  <p className="text-red-600">Hàn Quốc</p>
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon className="text-white" icon={faCalendarWeek} />
                    <p className="text-white">Ngày khởi chiếu</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">20/2/2024</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <FontAwesomeIcon className="text-white" icon={faClock} />
                    <p className="text-white">Thời lượng</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-white">120p</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrailerModal
        trailerUrl="https://www.youtube.com/embed/XTI1j_bgREY"
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
      />
    </>
  );
};
