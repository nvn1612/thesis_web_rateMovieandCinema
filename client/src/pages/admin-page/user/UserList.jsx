  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
  import { useNavigate } from 'react-router-dom';
  import { SearchInput } from '../../../components/search-input/SearchInput';
  import { UserSelect } from '../../../components/select-box/UserSelect';
  import { ActiveAccountSelect } from '../../../components/select-box/ActiveAccountSelect';
  import noAvatarUser from '../../../assets/images/no_user_avatar.jpg';
  import { CompletedModal } from '../../../components/Completed-modal/CompletedModal';

  export const UserList = () => {
    const [initialUsers, setInitialUsers] = useState([]); 
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('/user/getalluser');
        setInitialUsers(response.data); 
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const handleSelectionChange = (users) => {
      setFilteredUsers(users);
    };

    const deleteUser = async (userID) => {
      try {
        const response = await axios.delete(`/user/deleteuser/${userID}`);
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userID));
        setShowCompletedModal(true);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const closeModal = () => {
      setShowCompletedModal(false);
      navigate('/admin/users');
    };

    const handleSearch = async (searchTerm) => {
      try {
        if (searchTerm === '') {
          setFilteredUsers(initialUsers);
        } else {
          const response = await axios.get(`/user/user-search?username=${searchTerm}`);
          setFilteredUsers(response.data);
        }
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };

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
                <ActiveAccountSelect onSelectionChange={handleSelectionChange} />
                <SearchInput contentSearch="Tìm kiếm người dùng" onSearch={handleSearch} />
                <UserSelect onSelectionChange={handleSelectionChange} />
                <button
                  onClick={() => navigate('/admin/user/add')}
                  className="p-2 border text-white bg-green-400 rounded-lg hover:bg-green-500 transition"
                >
                  Thêm người dùng
                  <FontAwesomeIcon className="ml-2" icon={faPlus} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STT
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ảnh đại diện
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên tài khoản
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quyền hạn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chuyên gia
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nghề nghiệp</th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chức năng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className={user.is_active ? 'bg-green-200' : 'bg-red-200'}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={user.avatar ? `/${user.avatar}` : noAvatarUser}
                            alt="Không có ảnh"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.is_Admin ? 'Quản trị' : 'Người dùng'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            checked={user.is_expert}
                            type="checkbox"
                            className="w-4 h-4 accent-teal-600"
                            readOnly
                          />
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">{user.occupation ? user.occupation: null}</td> */}

                        <td className="px-6 py-4 whitespace-nowrap space-x-3">
                          <button
                            className="text-red-400 hover:text-red-500 transition"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => deleteUser(user.user_id)}
                            />
                          </button>
                          <button
                            className="text-blue-400 hover:text-blue-500 transition"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              onClick={() =>
                                navigate(`/admin/user/edit/${user.user_id}`)
                              }
                            />
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
        {showCompletedModal && (
          <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
        )}
      </div>
    );
  };
