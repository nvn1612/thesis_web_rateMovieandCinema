import React, { useEffect, useState } from 'react';
import axios from 'axios';
import noAvatarUser from "../../../assets/images/no_user_avatar.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const UserSuspicionLever = () => {
  const [getUsers, setGetUsers] = useState([]);

  useEffect(() => {
    const fetchSuspiciousUsers = async () => {
      try {
        const response = await axios.get('/user/suspicious-users');
        setGetUsers(response.data);
      } catch (error) {
        console.error('Error fetching suspicious users:', error);
      }
    };

    fetchSuspiciousUsers();
  }, []);
  const deleteUser = async (userID) => {
    try {
      const response = await axios.delete(`/user/deleteuser/${userID}`);
      console.log(response.data);
      setGetUsers(getUsers.filter(user => user.user_id !== userID));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh đại diện</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tài khoản</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mức độ nghi ngờ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getUsers.map((user, index) => (
            <tr key={index} >
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img 
                  src={user.avatar ? `http://localhost:8000/${user.avatar}` : noAvatarUser} 
                  alt="Không có ảnh" 
                  className="w-12 h-12 object-cover rounded-full" 
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.suspicion_level}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-3">
                <button className="text-red-400 hover:text-red-500 transition">
                  <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(user.user_id)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
