import React from "react";
import { ImageContent } from "../../components/image-content/ImageContent";
import { BtnSwitch } from "../../components/btn-switch/BtnSwitch";
import { RightContentSummaryMovie } from "../../components/right-content-summary-movie/RightContentSummaryMovie"
export const SummaryMovie = () => {
  return (

    <>
      <div className="flex justify-center items-center mt-4 bg-gray-900 p-10">
        <div className="w-1/3 flex justify-end">
          <ImageContent image="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/image/1800x/71252117777b696995f01934522c402d/m/o/mortal_kombat_-_vn_-_payoff_poster_1_1_.jpg" />
        </div>
        <div className="w-2/3">
          <RightContentSummaryMovie />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-1/3"> <BtnSwitch label="Thông tin phim" /></div>
        <div className="w-1/3"> <BtnSwitch label="Đánh giá từ người dùng" /></div>
        <div className="w-1/3"> <BtnSwitch label="Đáng giá từ chuyên gia" /></div>
      </div>
    </>
  );
};
