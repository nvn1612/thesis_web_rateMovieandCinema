import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { Spinner } from "../../components/spinner/Spinner";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { CompletedModal } from "../../components/Completed-modal/CompletedModal";

import axios from "axios";

const provinces = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
];

export const UserDetail = () => {
  const { user, setUser } = useContext(UserContext);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
      setUpdatedUser({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("address", updatedUser.address);
    formData.append("phone_number", updatedUser.phone_number);
    formData.append("is_Admin", updatedUser.is_Admin);
    formData.append("is_expert", updatedUser.is_expert);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const response = await axios.put(
        `/user/updateuser/${user.user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response && response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUpdatedUser({ ...response.data });
        setShowCompletedModal(true);
        setError(null); 
      } else {
        alert("Invalid response from server when updating user");
      }
    } catch (error) {
      console.error("Error updating user", error);
      setError(error.response.data.error); 
    } finally {
      setIsUpdating(false);
    }
  };

  const closeModal = () => {
    setShowCompletedModal(false);
  };

  if (isUserLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div>Không có thông tin người dùng</div>;
  }

  return (
    <>
      <div className="flex space-x-6">
        <div className="ml-8 flex flex-col space-y-3 items-center">
          <img
            className="rounded-full w-44 h-44 object-cover"
            src={updatedUser.avatar ? `/${updatedUser.avatar}` : noAvatarUser}
            alt="User avatar"
          />
          <div className="flex justify-center font-bold">
            <p>{updatedUser.is_expert ? "Chuyên gia" : "Khán giả"}</p>
          </div>
          <div className="flex justify-center">
            <p className="text-green-400">Tài khoản đã được kích hoạt!</p>
          </div>
        </div>

        <form
          className="max-w-lg mx-auto p-4 bg-white rounded shadow-md mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex space-x-3">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Tên tài khoản
              </label>
              <input
                disabled
                type="text"
                name="username"
                id="username"
                value={updatedUser.username}
                className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                disabled
                type="email"
                name="email"
                id="email"
                value={updatedUser.email}
                className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                style={{ width: `${updatedUser.email.length + 1}ch` }}
              />
            </div>
          </div>

          <div className="mb-4 flex space-x-3">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Tên người dùng
              </label>
              <input
                value={updatedUser.name}
                type="text"
                name="name"
                id="fullName"
                className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <select
                name="address"
                id="address"
                value={updatedUser.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Chọn tỉnh thành</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4 flex space-x-3">
            <div className="flex flex-col">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Số điện thoại
              </label>
              <input
                value={updatedUser.phone_number}
                type="tel"
                name="phone_number"
                id="phoneNumber"
                className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                onChange={handleInputChange}
              />
            </div>
          </div>

        
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="avatar"
            >
              Ảnh đại diện
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
            >
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </div>

      {showCompletedModal && (
        <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
      )}
    </>
  );
};
