import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const TheaterEdit = () => {
  const { theaterId } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    theater_name: "",
    address: "",
    region: "",
    description: "",
    theater_logo: null,
    theater_image_1: null,
    theater_image_2: null,
  });
  const [imagePreviewUrls, setImagePreviewUrls] = useState({
    theater_logo: "",
    theater_image_1: "",
    theater_image_2: ""
  });

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`/movie-theater/gettheater/${theaterId}`);
        const theater = response.data;
        setFormData({
          theater_name: theater.theater_name,
          address: theater.address,
          region: theater.region,
          description: theater.description,
          theater_logo: theater.theater_logo,
          theater_image_1: theater.theater_image_1,
          theater_image_2: theater.theater_image_2,
        });
        setImagePreviewUrls({
          theater_logo: theater.theater_logo ? `http://localhost:8000/${theater.theater_logo}` : "",
          theater_image_1: theater.theater_image_1 ? `http://localhost:8000/${theater.theater_image_1}` : "",
          theater_image_2: theater.theater_image_2 ? `http://localhost:8000/${theater.theater_image_2}` : ""
        });
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    };

    fetchTheater();
  }, [theaterId]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const file = files && files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrls((prevUrls) => ({
          ...prevUrls,
          [id]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected or invalid file type.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.put(`http://localhost:8000/movie-theater/updatetheater/${theaterId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cập nhật rạp chiếu thành công");
      navigate("/admin/TheaterList");
    } catch (error) {
      console.error("Error updating theater:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex w-full space-x-2">
          <div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="theater_name"
                >
                  Tên rạp chiếu
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="theater_name"
                  type="text"
                  placeholder="Tên rạp chiếu"
                  value={formData.theater_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Địa chỉ
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="address"
                  type="text"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="region"
                >
                  Khu vực
                </label>
                <div className="flex flex-col">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="region"
                      id="region"
                      value="Miền Bắc"
                      checked={formData.region === "Miền Bắc"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Miền Bắc</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="region"
                      id="region"
                      value="Miền Trung"
                      checked={formData.region === "Miền Trung"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Miền Trung</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="region"
                      id="region"
                      value="Miền Nam"
                      checked={formData.region === "Miền Nam"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Miền Nam</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="theater_logo"
                >
                  Ảnh logo rạp chiếu
                </label>
                <input
                  className="mt-1"
                  type="file"
                  id="theater_logo"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
              <div className="w-full px-3 mb-6">
                {imagePreviewUrls.theater_logo && (
                  <img
                    src={imagePreviewUrls.theater_logo}
                    alt="Theater Logo Preview"
                    className="object-cover w-32 h-32 rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Mô tả
              </label>
              <textarea
                className="appearance-none block w-96 bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="description"
                placeholder="Mô tả"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="theater_image_1"
              >
                Ảnh 1
              </label>
              <input
                className="mt-1"
                type="file"
                id="theater_image_1"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full px-3 mb-6">
              {imagePreviewUrls.theater_image_1 && (
                <img
                  src={imagePreviewUrls.theater_image_1}
                  alt="Theater Image 1 Preview"
                  className="object-cover w-32 h-32 rounded"
                />
              )}
            </div>
            <div className="w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="theater_image_2"
              >
                Ảnh 2
              </label>
              <input
                className="mt-1"
                type="file"
                id="theater_image_2"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
            <div className="w-full px-3 mb-6">
              {imagePreviewUrls.theater_image_2 && (
                <img
                  src={imagePreviewUrls.theater_image_2}
                  alt="Theater Image 2 Preview"
                  className="object-cover w-32 h-32 rounded"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Cập nhật rạp chiếu
          </button>
        </div>
      </form>
    </div>
  );
};
