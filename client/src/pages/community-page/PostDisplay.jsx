import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../layouts/header/Header';
import { BgTop } from '../../components/bg-top/BgTop';
import communityBG from '../../assets/images/community.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import noAvatarUser from '../../assets/images/no_user_avatar.jpg';
import { SearchInput } from '../../components/search-input/SearchInput';
import { PostTypeSelect } from '../../components/select-box/PostTypeSelect';
import { UserPostSelect } from '../../components/select-box/UserPostSelect';
import { ModalAddPost } from '../../components/modal-add-post/ModalAddPost';
import { PostSuccessModal } from '../../components/Completed-modal/PostSuccessModal';
import { Footer } from '../../layouts/footer/Footer';

export const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const postsPerPage = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/post/getallposts');
      const postsData = response.data.filter(post => post.is_moderated);
      setPosts(postsData);
      setFilteredPosts(postsData); 

      const usersData = {};
      const commentsCountData = {};

      await Promise.all(
        postsData.map(async post => {
          if (!usersData[post.user_id]) {
            usersData[post.user_id] = post.users;
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

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get('/post/getearliestposts');
        const latestPostsData = response.data.filter(post => post.is_moderated);
        setLatestPosts(latestPostsData);
      } catch (error) {
        setError(error);
      }
    };

    fetchLatestPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
    openSuccessModal(); 
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async searchTerm => {
    try {
      const response = await axios.get(`/post/searchposts?title=${encodeURIComponent(searchTerm)}`);
      setFilteredPosts(response.data.filter(post => post.is_moderated));
    } catch (error) {
      setError(error);
    }
  };

  const totalPages = Math.ceil(filteredPosts.length > 0 ? filteredPosts.length / postsPerPage : posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.length > 0 ? filteredPosts.slice(startIndex, startIndex + postsPerPage) : posts.slice(startIndex, startIndex + postsPerPage);

  const handlePostTypeChange = filteredPosts => {
    setFilteredPosts(filteredPosts);
  };

  const handleUserChange = filteredPosts => {
    setFilteredPosts(filteredPosts);
    setCurrentPage(1); 
  };

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
          <div className="flex space-x-5">
            <SearchInput contentSearch="Tìm kiếm bài viết" onSearch={handleSearch} />
          </div>
        </div>
        <div className="flex space-x-5 justify-center w-full h-full mb-3">
          <div className="flex flex-col space-y-5">
            <button
              onClick={openModal}
              className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 transition"
            >
              Tạo bài viết
            </button>
            <PostTypeSelect onPostTypeChange={handlePostTypeChange} />
            <UserPostSelect onUserChange={handleUserChange} is_admin={false} />
          </div>

          <div className="bg-white w-2/4 mt-4 rounded-md">
            <div className="bg-slate-500 p-5">
              <p className="text-white font-bold">Các bài viết trong cộng đồng</p>
            </div>
            <div className="flex flex-col ">
              {currentPosts.map(post => (
                <div
                  key={post.post_id}
                  className="p-4 bg-gray-300 border border-black border-1 cursor-pointer"
                  onClick={() => navigate(`/community/post-detail/${post.post_id}`)}
                >
                  <div className="flex space-x-2">
                    <img
                      src={users[post.user_id]?.avatar ? `/${users[post.user_id].avatar}` : noAvatarUser}
                      alt=""
                      className="rounded-full h-11 w-11 object-cover"
                    />
                    <div className="w-3/5 flex flex-col space-y-2">
                      <p className="font-bold">
                        {post.title}{' '}
                        <span className="p-1 bg-slate-400 rounded-lg text-xs text-white">
                          {post.is_movie_related ? 'Phim ảnh' : 'Rạp chiếu'}
                        </span>
                      </p>
                      <div className="flex space-x-2 items-center">
                        <div className="flex space-x-1 items-center">
                          <FontAwesomeIcon icon={faUser} />
                          <p className="text-sm text-gray-500">{users[post.user_id]?.username}</p>
                        </div>
                        <p className="bg-yellow-400 rounded-lg">
                          <p className="text-xs text-white p-1">
                            {post.is_expert_post ? 'Chuyên gia điện ảnh' : 'Khán giả'}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex space-x-1">
                        <p className="text-red-500">Lượt bình luận :</p>
                        <div className="flex space-x-1 items-center">
                          <p className="ml-1 font-bold">{commentsCount[post.post_id] || 0}</p>
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
            <div className="flex justify-center mt-1 mb-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-3 py-1 rounded-lg ${
                    currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-1/4 mt-4 h-96 rounded-md">
            <div className="bg-slate-500 p-5">
              <p className="text-white">Bài viết mới cập nhập</p>
            </div>
            {latestPosts.map(latestPost => (
              <div key={latestPost.post_id} className="flex flex-col bg-slate-300 " onClick={() => navigate(`/community/post-detail/${latestPost.post_id}`)}>
                <div className="p-3 space-y-1 border border-black cursor-pointer">
                  <div className="flex">
                    <img
                      src={
                        users[latestPost.user_id]?.avatar ? `/${users[latestPost.user_id].avatar}` : noAvatarUser
                      }
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <p className="ml-2">
                      {latestPost.title}{' '}
                      {/* <span className="bg-slate-400 text-xs p-1 text-white rounded-lg">
                        {latestPost.is_movie_related ? 'Phim ảnh' : 'Rạp chiếu'}
                      </span> */}
                    </p>
                  </div>
                  <div className="flex space-x-2 text-sm text-gray-400 ml-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <FontAwesomeIcon icon={faUser} />
                      <p>{users[latestPost.user_id]?.username}</p>
                    </div>
                    <p>{new Date(latestPost.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      </div>
      <Footer />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md">
            <ModalAddPost isOpen={isModalOpen} onClose={closeModal} onPostCreated={handlePostCreated} />
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <PostSuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
      )}
      
    </div>
  );
};
