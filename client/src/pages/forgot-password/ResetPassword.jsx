import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import imageForgotPassword from "../../assets/images/forgot-password-image.png";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
console.log(token);
const handleResetPassword = async () => {
  if (newPassword !== confirmPassword) {
    setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
    return;
  }

  try {
    const response = await axios.post(
      `/user/reset-password/${token}`,
      { newPassword }
    );
    setMessage(response.data.message);
    if (response.status === 200) {
      navigate("/login");
    }
  } catch (error) {
    setMessage(error.response?.data?.error);
  }
};
  return (
    <>
      <h1 className="text-green-500 text-6xl font-bold flex justify-center mt-16">
        Đổi mật khẩu
      </h1>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="font-bold p-1 mr-1">Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-1 border border-green-500 h-9"
              ></input>
            </div>
            <div className="flex flex-col">
              <label className="font-bold p-1 mr-1">Nhập lại mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-1 border border-green-500 h-9"
              ></input>
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="p-3 bg-green-500 mt-7 text-white rounded-lg"
          >
            Đổi mật khẩu
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
