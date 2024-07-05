import React, { useState } from "react";
import axios from "axios";
import imageForgotPassword from "../../assets/images/forgot-password-image.png";

export const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!username.trim()) {
      setMessage("Vui lòng nhập tài khoản !");
      return;
    }

    try {
      const response = await axios.post("/user/forgot-password", { username });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Có vấn đề xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <>
      <h1 className="text-green-500 text-6xl font-bold flex justify-center mt-16">
        Nhập tài khoản của bạn
      </h1>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex">
            <label className="font-bold p-1 mr-1">Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tài khoản"
              className="p-1 border border-green-500 h-9"
            ></input>
          </div>
          <button
            onClick={handleForgotPassword}
            className="p-3 bg-green-500 mt-7 text-white rounded-lg"
          >
            Quên mật khẩu
          </button>
          {message && (
            <div className="mt-4">
              <p>{message}</p>
            </div>
          )}
        </div>
        <img src={imageForgotPassword} alt="image" className="w-1/4 ml-4" />
      </div>
    </>
  );
};
