import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const UserEdit = () => {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  let { userId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/user/getuser/${userId}`)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setIsActive(data.is_active);
        setIsAdmin(data.is_Admin);
        setIsExpert(data.is_expert);
        setImagePreviewUrl(`http://localhost:8000/${data.avatar}`);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [userId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleIsActiveChange = (event) => setIsActive(event.target.checked);
  const handleIsAdminChange = (event) => setIsAdmin(event.target.checked);
  const handleIsExpertChange = (event) => setIsExpert(event.target.checked);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', name);
    data.append('is_Admin', isAdmin);
    data.append('is_expert', isExpert);
    data.append('is_active', isActive);
    data.append('avatar', selectedFile);

    try {
      const response = await axios.put(`http://localhost:8000/user/updateuser/${userId}`, data);
      console.log("User updated successfully", response.data);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user", error);
      alert("There was an error updating user: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Tên người dùng
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="is_active">
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
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="is_Admin">
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
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="is_expert">
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
                alt="Profile Preview"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              "Hãy chọn ảnh"
            )}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile_picture">
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};