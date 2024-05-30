import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart, faStar,faThumbsUp,faCalendarDays,faClock } from '@fortawesome/free-solid-svg-icons'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
export const RightContentSummaryMovie = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <div className="name-movie text-4xl font-bold mb-4 uppercase text-white">
            <p>Mortal Kombat</p>
        </div>
        <div className="category-movie text-lg text-white">
            <p>Hành động, hài hước, kinh dị</p>
        </div>
        <div className="flex space-x-5 mt-6">
            <button className="flex justify-center items-center p-3 space-x-2 bg-gray-300 rounded-lg hover:bg-green-500 hover:text-white transition duration-400">
                <FontAwesomeIcon icon={faYoutube} />
                <p>Trailer</p>
            </button> 
            <button className="flex justify-center items-center p-3 space-x-2 bg-gray-300 rounded-lg hover:bg-green-500 hover:text-white transition duration-400">
                <FontAwesomeIcon icon={faHeart} />
                <p>Thích</p>
            </button>       
             
            <button className="flex justify-center items-center p-3 space-x-2 bg-gray-300 rounded-lg hover:bg-green-500 hover:text-white transition duration-400">
                <FontAwesomeIcon icon={faStar} />
                <p>Đánh giá</p>
            </button>
        </div>
        <div className="description-movie text-lg mt-6 w-2/3 text-white">
            <p>
                Mortal Kombat là một bộ phim hành động võ thuật của Mỹ năm 2021 do Simon McQuoid đạo diễn từ kịch bản của Greg Russo và Dave Callaham và dựa trên loạt trò chơi video cùng tên của Ed Boon và John Tobias. Đây là bộ phim thứ ba trong loạt phim Mortal Kombat và là một bộ phim tái khởi đầu, với Lewis Tan, Jessica McNamee, Josh Lawson, Tadanobu Asano, Mehcad Brooks, Ludi Lin, Chin Han, Joe Taslim và Hiroyuki Sanada đóng vai chính.
            </p>
        </div>
        <div className="flex space-x-10 mt-6 text-white">
            <div className="level-movie flex flex-col justify-center items-center space-x-3">
                <div className="level-movie-item flex justify-center items-center space-x-3 text-white">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p className="">Đánh giá</p>
                </div>
                <p>8.5/10</p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-3">
                <div className=" flex justify-center items-center space-x-3 text-white">
                    <FontAwesomeIcon icon={faCalendarDays} />  
                    <p>Khởi chiếu</p>
                </div>
                <p>16/12/2002</p>
            </div>
            <div className="flex flex-col justify-center items-center space-x-3">
                <div className=" flex justify-center items-center space-x-3">
                    <FontAwesomeIcon icon={faClock} />
                    <p>Thời lượng</p>
                </div>
                <p>120 phút</p>
            </div>
        </div>
    </div>

  )
}
