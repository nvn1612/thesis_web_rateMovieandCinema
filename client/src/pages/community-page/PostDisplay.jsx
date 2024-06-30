import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { BgTop } from "../../components/bg-top/BgTop";
import communityBG from "../../assets/images/community.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { SearchInput } from "../../components/search-input/SearchInput";
import { PostTypeSelect } from "../../components/select-box/PostTypeSelect";
import { ModalAddPost } from "../../components/modal-add-post/ModalAddPost";
import { useNavigate } from "react-router-dom";

export const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/post/getallposts");
        const postsData = response.data.filter(post => post.is_moderated); 
        setPosts(postsData);

        const usersData = {};
        const commentsCountData = {};
        const likesCountData = {};

        await Promise.all(
          postsData.map(async (post) => {
            if (!usersData[post.user_id]) {
              const userResponse = await axios.get(`/user/getuser/${post.user_id}`);
              usersData[post.user_id] = userResponse.data.username;
            }

            const commentsResponse = await axios.get(`/post/getcommentcount/${post.post_id}`);
            commentsCountData[post.post_id] = commentsResponse.data.count;
          })
        );

        setUsers(usersData);
        setCommentsCount(commentsCountData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get("/post/getearliestposts");
        const latestPostsData = response.data.filter(post => post.is_moderated); 
        setLatestPosts(latestPostsData);
      } catch (error) {
        setError(error);
      }
    };

    fetchLatestPosts();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <BgTop
        title="Cộng đồng"
        decribe="Nơi chia sẻ những trải nghiệm xem phim và rạp chiếu phim tại Việt Nam. Hãy tham gia với chúng tôi!"
        CinemaBG={communityBG}
      />
      <div className="bg-slate-900 min-h-screen">
        <div className="flex justify-center h-full pt-4">
          <SearchInput contentSearch="Tìm kiếm bài viết" />
        </div>
        <div className="flex space-x-5 justify-center w-full h-full">
          <div className="flex flex-col space-y-5">
            <button 
              onClick={openModal} 
              className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 transition"
            >
              Tạo bài viết
            </button>
            <PostTypeSelect/>
          </div>
          
          <div className="bg-white w-2/4 mt-4 rounded-md">
            <div className="bg-slate-500 p-5">
              <p className="text-white font-bold">Các bài viết trong cộng đồng</p>
            </div>
            <div className="flex flex-col ">
              {posts.map((post) => (
                <div
                  key={post.post_id}
                  className="p-4 bg-gray-300 border border-black border-1 cursor-pointer"
                  onClick={() => navigate(`/community/post-detail/${post.post_id}`)}
                >
                  <div className="flex space-x-2">
                    <img
                      src={
                        users[post.user_id]?.avatar
                          ? `http://localhost:8000/${users[post.user_id].avatar}`
                          : noAvatarUser
                      }
                      alt=""
                      className="rounded-full h-11 w-11"
                    />
                    <div className="w-3/5 flex flex-col space-y-2">
                      <p className="font-bold">
                        {post.content}{" "}
                        <span className="p-1 bg-slate-400 rounded-lg text-xs text-white">
                          {post.is_movie_related ? "Phim ảnh" : "Rạp chiếu"}
                        </span>
                      </p>
                      <div className="flex space-x-2 items-center">
                        <div className="flex space-x-1 items-center">
                          <FontAwesomeIcon icon={faUser} />
                          <p className="text-sm text-gray-500">
                            {users[post.user_id]}
                          </p>
                        </div>
                        <p className="bg-yellow-400 rounded-lg">
                          <p className="text-xs text-white p-1">{post.is_expert_post ? "Chuyên gia điện ảnh" : "Khán giả"}</p>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex space-x-1">
                        <p className="text-red-500">Lượt bình luận :</p>
                        <div className="flex space-x-1 items-center">
                          <p className="ml-1 font-bold">
                            {commentsCount[post.post_id] || 0}
                          </p>
                          <FontAwesomeIcon icon={faComment} />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <p className="text-gray-400">Ngày đăng :</p>
                        <p className="text-gray-400">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white w-1/4 mt-4 h-96 rounded-md">
            <div className="bg-slate-500 p-5">
              <p className="text-white">Bài viết mới cập nhập</p>
            </div>
            {latestPosts.map((latestPost) => (
              <div key={latestPost.post_id} className="flex flex-col bg-slate-300 ">
                <div className="border border-black border-1 p-1">
                <div className="flex space-x-1 ">
                  <img
                    className="h-8 w-8 rounded-full flex-shrink-0"
                    src={
                      users[latestPost.user_id]?.avatar
                      ? `http://localhost:8000/${users[latestPost.user_id].avatar}`
                      : noAvatarUser
                    }
                    alt=""
                  />
                  <p>
                    {latestPost.content}{" "}
                    <span className="ml-1 p-1 bg-slate-400 rounded-lg text-xs text-white">
                      {latestPost.is_movie_related ? "Phim ảnh" : "Rạp chiếu"}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-2 text-sm text-gray-400 ml-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faUser} />
                    <p>{users[latestPost.user_id]}</p>
                  </div>
                  <p>{new Date(latestPost.created_at).toLocaleDateString()}</p>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md">
            <ModalAddPost isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};
