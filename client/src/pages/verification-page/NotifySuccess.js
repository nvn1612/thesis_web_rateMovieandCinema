import React from 'react'
import imageNotifySucces from '../../assets/images/notify-success.png'
export const NotifySuccess = () => {
  return (
        <div class="flex justify-center m-20">
            <div className="flex flex-col">
                <strong class="mt-36 mr-18">Tài khoản đã được kích hoạt thành công !</strong>
                <a href="/login" className="text-red-500">Đăng nhập ngay</a>
            </div>
            <img src={imageNotifySucces} alt="image" class="w-1/4"/>
        </div>
  )
}
