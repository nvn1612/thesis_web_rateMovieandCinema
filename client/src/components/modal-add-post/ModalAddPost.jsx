import React, { useState, useContext } from "react";
import axios from 'axios';
import addPostBg from "../../assets/images/communityaddpost.png";
import UserContext from "../../context/UserContext"; 

export const ModalAddPost = ({ isOpen, onClose, onPostCreated }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMovieRelated, setIsMovieRelated] = useState(false);
  const { user } = useContext(UserContext);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_id', user.user_id); 
    formData.append('title', title);
    formData.append('content', content);
    formData.append('is_movie_related', isMovieRelated);
    formData.append('is_expert', user.is_expert);
    if (image) {
      formData.append('image_post', image);
    }

    try {
      const response = await axios.post('/post/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Post created:', response.data);
      onPostCreated(); 
      onClose(); 
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-2/5 bg-slate-400">
        <div className="h-14 bg-slate-500 flex items-center justify-between px-4">
          <p className="text-white">Tạo bài viết</p>
          <button onClick={onClose} className="text-white font-bold">X</button>
        </div>
        {!user ? (
          <p className="text-red-500 p-5">Vui lòng đăng nhập để tạo bài viết</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex p-5">
            <div className="w-1/4 flex items-center justify-center">
              <img src={addPostBg} alt="Add post" />
            </div>
            <div className="flex flex-col w-3/4">
              <div className="flex flex-col">
                <div className="flex space-x-1">
                  <label className="font-bold">Tiêu đề</label>
                  <p className="text-red-500">*</p>
                </div>
                <textarea 
                  className="border border-black rounded-md p-2" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-1">
                  <label className="font-bold">Nội dung</label>
                  <p className="text-red-500">*</p>
                </div>
                <textarea 
                  className="border border-black rounded-md p-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-bold">
                  <input
                    type="radio"
                    name="topic"
                    value="cinema"
                    className="mr-2"
                    checked={!isMovieRelated}
                    onChange={() => setIsMovieRelated(false)}
                  />
                  Chủ đề về rạp chiếu
                </label>
                <label className="font-bold">
                  <input 
                    type="radio" 
                    name="topic" 
                    value="movie" 
                    className="mr-2" 
                    checked={isMovieRelated}
                    onChange={() => setIsMovieRelated(true)}
                  />
                  Chủ đề về phim
                </label>
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Thêm ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="p-2"
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Chosen"
                    className="mt-2 object-cover w-32 h-32"
                  />
                )}
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-green-500 pl-2 pr-2 pt-2 pb-2 rounded-lg text-white hover:bg-green-600">
                  Tạo bài viết
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
