import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
export const UserList = () => {
  const [getUsers, setGetUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const reponse = await axios.get("http://localhost:8000/user/getalluser");
      setGetUsers(reponse.data);
      
    };

    fetchUsers();
  }, []);
  const deleteUser = async (userID) =>{
    try{
      const response = await axios.delete(`http://localhost:8000/user/deleteuser/${userID}`)
      console.log(response.data);
      setGetUsers(getUsers.filter(user => user.user_id !== userID));
    }catch(error){
      console.error(error)
    }
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex justify-start items-center mb-4">
                <span className="inline-block h-3 w-3 rounded-full bg-red-200 mr-2"></span>
                <span>Chưa kích hoạt</span>
                <span className="inline-block h-3 w-3 rounded-full bg-green-200 ml-4 mr-2"></span>
                <span>Đã kích hoạt</span>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ảnh đại diện
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên tài khoản
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quyền hạn
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Chuyên gia
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Chức năng
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getUsers.map((user, index) => (
                    <tr key={index} className={user.is_active? 'bg-green-200' : 'bg-red-200'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img url={user.avatar} alt="Không có ảnh" />{" "}
                        {/* Replace with your user avatar field */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_Admin ? "Quản trị" : "Người dùng"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          checked={user.is_expert}
                          type="checkbox"
                          class="w-4 h-4 accent-teal-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <FontAwesomeIcon icon={faTrash} onClick={()=>deleteUser(user.user_id)}/>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
