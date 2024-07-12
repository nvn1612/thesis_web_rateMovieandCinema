import React, { useState } from "react";
import axios from "axios";
import { CompletedModal } from "../../../components/Completed-modal/CompletedModal";
import { useNavigate } from "react-router-dom";

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
export const UserCreate = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone_number: "",
    address: "",
    is_Admin: false,
    is_expert: false,
    occupation: "",
    profile_picture: null,
  });
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      setFormData((prevState) => ({
        ...prevState,
        profile_picture: file,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("name", formData.name);
    data.append("phone_number", formData.phone_number);
    data.append("address", formData.address);
    data.append("is_Admin", formData.is_Admin);
    data.append("is_expert", formData.is_expert);
    if (formData.profile_picture) {
      data.append("avatar", formData.profile_picture);
    }
    if (formData.is_expert) {
      data.append("occupation", formData.occupation);
    }

    try {
      const response = await axios.post("/user/createuser", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User created successfully", response.data);
      setIsCompletedModalOpen(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Có lỗi khi tạo người dùng !", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Có lỗi trong việc tạo người dùng: " + error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setIsCompletedModalOpen(false);
    navigate("/admin/users");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Tài khoản
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="username"
              type="text"
              placeholder="Tài khoản"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3 ">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Tên người dùng
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Tên người dùng"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="phone_number"
            >
              Số điện thoại
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone_number"
              type="tel"
              placeholder="Số điện thoại "
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Địa chỉ
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              value={formData.address}
              onChange={handleChange}
            >
              <option value="">Chọn địa chỉ</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="is_Admin"
            >
              Quyền quản trị
            </label>
            <input
              className="mt-1"
              type="checkbox"
              id="is_Admin"
              checked={formData.is_Admin}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="is_expert"
            >
              Chuyên gia
            </label>
            <input
              className="mt-1"
              type="checkbox"
              id="is_expert"
              checked={formData.is_expert}
              onChange={handleChange}
            />
          </div>
          {formData.is_expert && (
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="occupation"
              >
                Nghề nghiệp
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="occupation"
                type="text"
                placeholder="Nghề nghiệp"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 space-x-8">
          <div className="w-28 h-28">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Profile Preview"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              "Hãy chọn ảnh"
            )}
          </div>
          <div className="w-full md:w-1/3 px-3  md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="profile_picture"
            >
              Hình đại diện
            </label>
            <input
              type="file"
              id="profile_picture"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Thêm người dùng
          </button>
        </div>
        {errorMessage && (
        <div className="text-red-500 text-center mt-2">
          {errorMessage}
        </div>
      )}
      </form>
      <CompletedModal
        isOpen={isCompletedModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
