import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import UserContext from "../../context/UserContext"; 

export const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(UserContext);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post/getpost/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); 

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/post/createcomment", {
        postId: post.post_id,
        userId: user.user_id,
        content: newComment,
      });

      const createdComment = response.data;

     
      setPost((prevPost) => ({
        ...prevPost,
        post_comments: [...prevPost.post_comments, createdComment],
      }));

      
      setNewComment('');
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <>
      <Header />
      <div className="bg-slate-900 min-h-screen">
        <div className="flex justify-between">
          <div className="bg-gray-300 w-[900px] rounded-lg m-5">
            <div className="flex">
              <div className="flex flex-col space-y-2 m-2 flex-shrink-0">
                <img
                  src={`http://localhost:8000/${post.users.avatar}`} 
                  className="h-48 w-48 rounded-full"
                  alt=""
                />
                <div className="flex space-x-2 justify-center">
                  <p className="text-gray-600">Đăng bởi : </p>
                  <p className="font-bold">{post.users.name}</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-white text-xs pr-2 pl-2 pt-1 pb-1 bg-yellow-500 rounded-xl">
                    {post.is_expert_post ? 'Chuyên gia điện ảnh' : 'Khán giả'}
                  </p>
                </div>
                <div className="flex space-x-2 justify-center">
                  <p className="text-gray-400 text-xs">Ngày đăng : </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="w-full m-5">
                <div className="flex justify-center">
                  <p className="text-3xl font-bold">{post.title}</p>
                </div>
                <div className="mt-5">
                  {post.content}
                </div>
                {post.image_post && (
                  <div className="mt-4">
                    <img src={`http://localhost:8000/${post.image_post}`} alt="" className="h-48" />
                  </div>
                )}
                <div className="flex justify-end mt-5 mb-3 space-x-2">
                  <button className="pl-2 pr-2 pt-1 pb-1 bg-green-500 text-white hover:bg-green-600 transition rounded-lg" onClick={handleCommentSubmit}>
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    Bình luận
                  </button>
                  <textarea
                    className="border border-black rounded-md p-2 w-96"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-[500px] rounded-lg m-5">
            <div className="flex bg-slate-500 p-3 ">
              <p className="text-white">Bình luận đến từ mọi người</p>
            </div>
            <div className="flex flex-col">
              {post.post_comments.map((comment) => (
                <div className="flex flex-col m-2" key={comment.comment_id}>
                  <p className="p-1 bg-blue-900 text-white">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                  <div className="bg-gray-400">
                    <div className="flex m-2">
                      <img
                        src={`/${comment.users.avatar}`} 
                        className="h-12 w-12 rounded-full object-cover"
                        alt=""
                      />
                      <div className="flex flex-col ml-1">
                        <p className="font-bold">{comment.users.name}</p>
                        <p className="text-white text-xs p-1 bg-yellow-500 rounded-xl flex justify-center">
                          {comment.users.is_expert ? 'Chuyên gia điện ảnh' : 'Khán giả'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-300">
                    <div className="m-2">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
