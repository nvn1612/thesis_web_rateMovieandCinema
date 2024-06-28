import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { BgTop } from "../../components/bg-top/BgTop";
import communityBG from "../../assets/images/community.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { SearchInput } from "../../components/search-input/SearchInput";
import { PostTypeSelect } from "../../components/select-box/PostTypeSelect";


export const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/post/getallposts");
        const postsData = response.data;
        setPosts(postsData);

        const usersData = {};
        const commentsCountData = {};
        const likesCountData = {};

        await Promise.all(
          postsData.map(async (post) => {
            if (!usersData[post.user_id]) {
              const userResponse = await axios.get(`http://localhost:8000/user/getuser/${post.user_id}`);
              usersData[post.user_id] = userResponse.data.username;
            }

            const commentsResponse = await axios.get(`http://localhost:8000/post/getcommentcount/${post.post_id}`);
            commentsCountData[post.post_id] = commentsResponse.data.count;

            const likesResponse = await axios.get(`http://localhost:8000/post/getlikecount/${post.post_id}`);
            likesCountData[post.post_id] = likesResponse.data.count;
          })
        );

        setUsers(usersData);
        setCommentsCount(commentsCountData);
        setLikesCount(likesCountData);
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
        const response = await axios.get("http://localhost:8000/post/getearliestposts");
        const latestPostsData = response.data;
        setLatestPosts(latestPostsData);
      } catch (error) {
        setError(error);
      }
    };

    fetchLatestPosts();
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
      <div className="bg-slate-900 min-h-screen">
        <div className="flex justify-center h-full pt-4">
          <SearchInput contentSearch="Tìm kiếm bài viết" />
        </div>
        <div className="flex space-x-5 justify-center w-full h-full">
          <div className="flex flex-col space-y-5">
            
            <button className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 transition">Thêm bài viết</button>
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
                className="p-4 bg-gray-300 border border-black border-1"
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
                      <p className="text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString()}
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
                    <div className="flex space-x-1">
                      <p className="text-red-500">Lượt thích :</p>
                      <div className="flex space-x-1 items-center">
                        <p className="ml-1 font-bold">
                          {likesCount[post.post_id] || 0}
                        </p>
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
          {latestPosts.map((latestPost) => (
            <div key={latestPost.post_id} className="flex flex-col bg-slate-300 ">
              <div className="border border-black border-1 p-1">
              <div className="flex space-x-1 ">
                <img
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  src=
                  {
                  users[latestPost.user_id]?.avatar
                  ? `http://localhost:8000/${users[latestPost.user_id].avatar}`
                  : noAvatarUser}
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

    </div>
  );
};
