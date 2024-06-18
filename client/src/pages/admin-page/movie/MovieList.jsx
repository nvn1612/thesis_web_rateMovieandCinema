
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
export const MovieList = () => {
  const [getUsers, setGetUsers] = useState([]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-screen">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 h-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-full flex flex-col">
              <div className="flex items-center mb-4 justify-between m-2">
                <div>
                  <span className="inline-block h-3 w-3 rounded-full bg-red-200 mr-2"></span>
                  <span>Chưa kích hoạt</span>
                  <span className="inline-block h-3 w-3 rounded-full bg-green-200 ml-4 mr-2"></span>
                  <span>Đã kích hoạt</span>
                </div>
                <button onClick={() => navigate('/admin/user/add')} className="p-2 border text-white bg-blue-400 rounded-lg hover:bg-blue-600 transition">
                  Thêm người dùng
                  <FontAwesomeIcon className="ml-2" icon={faPlus} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quốc gia</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đạo diễn</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên gia</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getUsers.map((user, index) => (
                      <tr key={index} className={user.is_active ? 'bg-green-200' : 'bg-red-200'}>
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={`http://localhost:8000/${user.avatar}`} alt="Không có ảnh" className="w-12 h-12 object-cover rounded-full" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.is_Admin ? "Quản trị" : "Người dùng"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input checked={user.is_expert} type="checkbox" className="w-4 h-4 accent-teal-600" readOnly />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-3">
                          <FontAwesomeIcon icon={faTrash} />
                          <FontAwesomeIcon icon={faPenToSquare} onClick={() =>navigate(`/admin/user/edit/${user.user_id}`)}/>
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
  )
}
