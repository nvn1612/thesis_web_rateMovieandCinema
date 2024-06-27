import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../layouts/header/Header';
import { BgTop } from '../../components/bg-top/BgTop';
import communityBG from '../../assets/images/community.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";

export const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/post/getallposts');
        const postsData = response.data;
        setPosts(postsData);

        const usersData = {};
        await Promise.all(
          postsData.map(async (post) => {
            if (!usersData[post.user_id]) {
              const userResponse = await axios.get(`http://localhost:8000/user/getuser/${post.user_id}`);
              usersData[post.user_id] = userResponse.data.username;
            }
          })
        );
        setUsers(usersData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <BgTop
        title="Cộng đồng"
        decribe="Nơi chia sẻ những trải nghiệm xem phim và rạp chiếu phim tại Việt Nam. Hãy tham gia với chúng tôi!"
        CinemaBG={communityBG}
      />
      <div className="bg-slate-900 min-h-screen flex space-x-5 justify-center">
        <select className="border rounded-md p-2 h-12 mt-4">
          <option value="all">Tất cả</option>
          <option value="movie_posts">Bài viết về phim</option>
          <option value="cinema_posts">Bài viết về rạp chiếu phim</option>
        </select>
        <div className="bg-white w-2/4 mt-4 rounded-md">
          <div className="bg-slate-500 p-5">
            <p className="text-white font-bold">Các bài viết trong cộng đồng</p>
          </div>
          <div className="flex flex-col ">
            {posts.map(post => (
              <div key={post.post_id} className="p-4 bg-gray-300 border border-black border-1">
                <div className="flex space-x-2">
                  <img src={users[post.user_id]?.avatar
                          ? `http://localhost:8000/${users[post.user_id].avatar}`
                          : noAvatarUser} alt="" className="rounded-full h-16 w-16" />
                  <div className="w-3/5 flex flex-col space-y-2">
                    <p className="font-bold">
                      {post.content} <span className="p-1 bg-slate-400 rounded-lg text-xs text-white">{post.is_movie_related ? 'Phim ảnh' : 'Rạp chiếu'}</span>
                    </p>
                    <div className="flex space-x-2 items-center">
                      <p className="text-sm text-gray-500">{users[post.user_id]}</p>
                      <p className="text-sm text-gray-600">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex space-x-1">
                      <p className="text-red-500">Lượt bình luận :</p>
                      <div className="flex space-x-1 items-center">
                        <p className="ml-1 font-bold">3</p>
                        <FontAwesomeIcon icon={faComment} />
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <p className="text-red-500">Lượt thích :</p>
                      <div className="flex space-x-1 items-center">
                        <p className="ml-1 font-bold">3</p>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </div>
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
        </div>
      </div>
    </div>
  );
};
