import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserPostSelect } from '../../../components/select-box/UserPostSelect';
import { SearchInput } from '../../../components/search-input/SearchInput';
import { ModeratePostSelect } from '../../../components/select-box/ModeratePostSelect';

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/post/getallposts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/post/deletepost/${postId}`);
      const updatedPosts = posts.filter((post) => post.post_id !== postId);
      setPosts(updatedPosts);
      console.log(`Deleted post with ID ${postId}`);
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
    }
  };

  const handleModeratePost = async (postId) => {
    try {
      const response = await axios.put(`/post/moderatepost/${postId}`);
      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post.post_id === postId ? { ...post, is_moderated: updatedPost.is_moderated } : post
      );
      setPosts(updatedPosts);
      console.log(`Moderated post with ID ${postId}`);
    } catch (error) {
      console.error(`Error moderating post with ID ${postId}:`, error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <SearchInput contentSearch="Tìm kiếm bài viết" />
                <ModeratePostSelect/>
                <div>
                  <span className="inline-block h-3 w-3 rounded-full bg-red-200 mr-2"></span>
                  <span>Chưa kiểm duyệt</span>
                </div>  
              <UserPostSelect />
            </div>
            <div className="flex-grow overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người đăng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bình luận</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sửa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post, index) => (
                    <tr key={post.post_id} className={post.is_moderated ? '' :'bg-red-100' }>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{post.users?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{post.is_movie_related ? 'Phim ảnh' : 'Rạp chiếu'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="hover:text-orange-500 transition" onClick={() => navigate(`/admin/posts/content/${post.post_id}`)}>Xem chi tiết</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="hover:text-orange-500 transition" onClick={() => navigate(`/admin/posts/comments/${post.post_id}`)}>Xem chi tiết</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(post.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(post.updated_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        {post.is_moderated ? (
                          ''
                        ) : (
                          <button className="hover:text-green-500 text-green-400 transition" onClick={() => handleModeratePost(post.post_id)}>
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        )}
                        <button className="text-red-400 hover:text-red-500 transition" onClick={() => handleDeletePost(post.post_id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
