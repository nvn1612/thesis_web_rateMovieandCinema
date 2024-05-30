import React from 'react'
import imageCheckSignup from '../../assets/images/shrek.png'
export const VerifySignup = () => {
  return (
    <>
         <h1 class="text-green-500 text-6xl font-bold flex justify-center mt-16">Xác thực đăng kí</h1> 
         <div class="flex justify-center m-20">
            <p class="text-1xl mt-20">
            Tài khoản của bạn đã được đăng kí thành công, <strong>nhưng cần kích hoạt tài khoản trước khi sử dụng.</strong>
            <br/>
            Vui lòng kiểm tra email mà bạn đã đăng kí và làm theo hướng dẫn để kích hoạt tài khoản.
            </p>
            
            <img src={imageCheckSignup} alt="image" class="w-1/4"/>
         </div>
    </>
       
  )
}
