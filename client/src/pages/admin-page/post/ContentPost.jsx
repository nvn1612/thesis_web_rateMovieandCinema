import React, { useEffect, useState } from 'react';
import axios from 'axios';
const {useParams} = require('react-router-dom');
export const ContentPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const { postId } = useParams();
    useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post/getpost/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError('Could not retrieve post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
            <div className="flex items-center mb-4 justify-between m-2">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">Đăng bởi : {post.users?.username} vào ngày {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              <div className="bg-white p-4 rounded shadow">
                <p className="mb-4">{post.content}</p>
                {post.image_post ?(
                      <img src={`/${post.image_post}`} alt="Post" className=" h-40" />

                ) : <p className="text-gray-400">(Không có ảnh)</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
