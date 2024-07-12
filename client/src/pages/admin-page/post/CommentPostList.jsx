import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { CompletedModal } from '../../../components/Completed-modal/CompletedModal';

export const CommentPostList = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/post/getcomments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/post/deletecomment/${commentId}`);
      console.log('Comment deleted:', response.data);

      setComments(comments.filter(comment => comment.comment_id !== commentId));
      setShowCompletedModal(true);

    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const closeModal = () => {
    setShowCompletedModal(false);
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
            </div>
            <div className="flex-grow overflow-y-auto">
            {comments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Bài viết chưa có bình luận nào.</p>
                </div>
              ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người đăng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung bình luận</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map((comment, index) => (
                    <tr key={comment.comment_id}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{comment.users?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{comment.content}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(comment.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button className="text-red-400 hover:text-red-500 transition" onClick={()=>handleDeleteComment(comment.comment_id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {showCompletedModal && (
          <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
        )}
    </div>
  );
};
