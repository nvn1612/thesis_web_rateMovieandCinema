import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CompletedModal } from "../../../components/Completed-modal/CompletedModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noAvatarUser from "../../../assets/images/no_user_avatar.jpg";

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

export const UserEdit = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const navigate = useNavigate();
  let { userId } = useParams();

  useEffect(() => {
    axios
      .get(`/user/getuser/${userId}`)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setIsActive(data.is_active);
        setIsAdmin(data.is_Admin);
        setIsExpert(data.is_expert);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
        setOccupation(data.occupation);
        setImagePreviewUrl(data.avatar ? `/${data.avatar}` : noAvatarUser);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [userId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleIsActiveChange = (event) => setIsActive(event.target.checked);
  const handleIsAdminChange = (event) => setIsAdmin(event.target.checked);
  const handleIsExpertChange = (event) => setIsExpert(event.target.checked);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleOccupationChange = (event) => setOccupation(event.target.value);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("phone_number", phoneNumber);
    data.append("address", address);
    data.append("occupation", occupation);
    data.append("is_Admin", isAdmin);
    data.append("is_expert", isExpert);
    data.append("is_active", isActive);
    data.append("avatar", selectedFile);

    try {
      const response = await axios.put(`/user/updateuser/${userId}`, data);
      console.log("User updated successfully", response.data);
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error updating user", error);
      alert("There was an error updating user: " + error.message);
    }
  };
  const handleCloseModal = () => {
    setShowCompletedModal(false);
    navigate("/admin/users");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Tên người dùng
            </label>
            <input
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
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
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id="phone_number"
              type="tel"
              placeholder="Số điện thoại "
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
              value={address}
              onChange={handleAddressChange}
            >
              <option value="">Chọn địa chỉ</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {isExpert && (
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="occupation"
              >
                Nghề nghiệp
              </label>
              <input
                className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                id="occupation"
                type="text"
                placeholder="Nghề nghiệp"
                value={occupation ?? ""}
                onChange={handleOccupationChange}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 mt-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="is_active"
            >
              Kích hoạt tài khoản
            </label>
            <input
              className="mt-1"
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={handleIsActiveChange}
            />
          </div>
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
              checked={isAdmin}
              onChange={handleIsAdminChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
              checked={isExpert}
              onChange={handleIsExpertChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 space-x-8">
          <div className="w-28 h-28">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="chưa có ảnh"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              "Hãy chọn ảnh"
            )}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="profile_picture"
            >
              Ảnh đại diện
            </label>
            <input
              className="mt-1"
              type="file"
              id="profile_picture"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center flex justify-center">
          <div className="md:w-1/3">
            <button
              className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Sửa người dùng
            </button>
          </div>
        </div>
      </form>
      {showCompletedModal && (
        <CompletedModal
          isOpen={showCompletedModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
