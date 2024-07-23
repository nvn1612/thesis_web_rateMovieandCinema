import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header } from "../../layouts/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import noAvatarUser from "../../assets/images/no_user_avatar.jpg";
import { Spinner } from "../../components/spinner/Spinner";


export const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

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
    if (!user) {
      setError("Bạn cần đăng nhập để thực hiện chức năng này.");
      return;
    }

    if (!newComment.trim()) {
      setError("Bạn chưa nhập bình luận.");
      return;
    }

    if (newComment.trim().length < 3) {
      setError("Bình luận quá ngắn!");
      return;
    }

    try {
      const response = await axios.post("/post/createcomment", {
        postId: post.post_id,
        userId: user.user_id,
        content: newComment,
      });

      const createdComment = response.data;

      setPost((prevPost) => ({
        ...prevPost,
        post_comments: [...prevPost.post_comments, createdComment],
      }));

      setNewComment("");
      setError(null);

      const newCurrentPage = Math.ceil(
        (post.post_comments.length + 1) / commentsPerPage
      );
      setCurrentPage(newCurrentPage);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/post/deletecomment/${commentId}`);
      setPost((prevPost) => ({
        ...prevPost,
        post_comments: prevPost.post_comments.filter(
          (comment) => comment.comment_id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) {
    return <Spinner/>;
  }

  if (!post) {
    return <p>Không tìm thấy bài viết nào!</p>;
  }

  const totalComments = post.post_comments ? post.post_comments.length : 0;
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = post.post_comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="bg-slate-900 min-h-screen">
        <div className="flex justify-between">
          <div className="bg-gray-300 w-[900px] min-h-[900px] rounded-lg m-5">
            <div className="flex">
              <div className="flex flex-col space-y-2 m-2 flex-shrink-0">
                <img
                  src={
                    post.users.avatar ? `/${post.users.avatar}` : noAvatarUser
                  }
                  className="h-48 w-48 rounded-full object-cover"
                  alt=""
                />
                <div className="flex space-x-2 justify-center">
                  <p className="text-gray-600">Đăng bởi : </p>
                  {post.users.name ? (
                    <p className="font-bold">{post.users.name}</p>
                  ) : (
                    <p className="font-bold">{post.users.username}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <p className="text-white text-xs pr-2 pl-2 pt-1 pb-1 bg-yellow-500 rounded-xl">
                    {post.is_expert_post ? "Chuyên gia điện ảnh" : "Khán giả"}
                  </p>
                </div>
                {post.is_expert_post ? (
                  <div className="flex justify-center">
                    <p className="text-white text-xs pr-2 pl-2 pt-1 pb-1 bg-yellow-500 rounded-xl">
                      {post.users.occupation}
                    </p>
                  </div>
                ) : null}
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
                <div className="mt-5">{post.content}</div>
                {post.image_post && (
                  <div className="mt-4">
                    <img src={`/${post.image_post}`} alt="" className="h-48" />
                  </div>
                )}
                <div className="flex justify-end mt-5 mb-3 space-x-2">
                  <textarea
                    className="border border-black rounded-md p-2 w-96"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <button
                    className="pl-2 pr-2 pt-1 pb-1 bg-green-500 text-white hover:bg-green-600 transition rounded-lg"
                    onClick={handleCommentSubmit}
                  >
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    Bình luận
                  </button>
                </div>
                <div className="flex justify-center">
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-[500px] rounded-lg m-5 min-h-[850px]">
            <div className="flex bg-slate-500 p-3 ">
              <p className="text-white">Bình luận đến từ mọi người</p>
            </div>
            <div className="flex flex-col">
              {currentComments.map((comment) => (
                <div className="flex flex-col m-2" key={comment.comment_id}>
                  <div className="flex justify-between bg-blue-900">
                    <p className="p-1 text-white">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                    {user?.user_id === comment.users.user_id && (
                      <button
                        className="mr-2"
                        onClick={() => handleDeleteComment(comment.comment_id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 hover:text-red-700 transition"
                        />
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-400">
                    <div className="flex m-2">
                      <img
                        src={
                          comment.users.avatar
                            ? `/${comment.users.avatar}`
                            : noAvatarUser
                        }
                        className="h-12 w-12 rounded-full object-cover"
                        alt=""
                      />
                      <div className="flex flex-col ml-1">
                        <p className="font-bold">{comment.users.username}</p>
                        <p className="text-white text-xs p-1 bg-yellow-500 rounded-xl flex justify-center">
                          {comment.users.is_expert
                            ? "Chuyên gia điện ảnh"
                            : "Khán giả"}
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

              {totalComments === 0 && (
                <p className="m-2">Không có bình luận nào.</p>
              )}
            </div>
            {totalComments > commentsPerPage && (
              <div className="flex justify-center mt-4">
                <ul className="flex list-none pb-3">
                  {Array.from(
                    { length: Math.ceil(totalComments / commentsPerPage) },
                    (_, index) => (
                      <li key={index} className="mr-3">
                        <button
                          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-lg${
                            currentPage === index + 1 ? " bg-gray-400" : ""
                          }`}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
