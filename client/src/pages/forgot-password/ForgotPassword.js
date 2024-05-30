import React from "react";
import imageForgotPassword from "../../assets/images/forgot-password-image.png";
export const ForgotPassword = () => {
  return (
    <>
      <h1 class="text-green-500 text-6xl font-bold flex justify-center mt-16">
        Khôi phục mật khẩu
      </h1>
      <div class="flex justify-center mt-10">
        <div class="flex flex-col justify-center items-center">
          <div class="flex">
            <label class="font-bold p-1 mr-1">Tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tài khoản"
              class="p-1 border border-green-500 h-9"
            ></input>
          </div>
          <button class="p-3 bg-green-500 mt-7 text-white rounded-lg">Quên mật khẩu</button>
        </div>  
        <img src={imageForgotPassword} alt="image" class="w-1/4 ml-4" />
      </div>
    </>
  );
};
