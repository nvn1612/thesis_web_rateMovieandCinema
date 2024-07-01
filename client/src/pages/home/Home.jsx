import React from 'react'
import { Header } from '../../layouts/header/Header'
import { Footer } from '../../layouts/footer/Footer'
import { BgTop } from '../../components/bg-top/BgTop'
import homeBG from '../../assets/images/homeBG.jpg'
import homeMovieBG from '../../assets/images/homeMovieBG.png'
import homeTheaterBG from '../../assets/images/homeTheaterBG.jpg'
import homeCommunityBG from '../../assets/images/homeCommunityBG.jpg'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col'>
        <Header/>
        <BgTop
          title="CHÀO MỪNG BẠN ĐẾN VỚI VICIMO"
          decribe="Hãy tham gia đáng giá phim, rạp chiếu phim và chia sẻ trải nghiệm cùng cộng đồng của chúng tôi !"
          CinemaBG={homeBG}
        />
        <div className="bg-gray-200 h-min-screen flex justify-center">
            <div className="w-3/4 bg-white h-full">
                <div className="flex flex-col m-4 space-y-4">
                  <div className="p-3 rounded-lg shadow-xl">
                    <div className="flex items-center">
                          <div className="flex flex-col space-y-3">
                              <p className="text-2xl font-bold text-green-500">Xem đánh giá và tham gia đáng giá các bộ phim bạn yêu thích</p>
                              <div className="flex justify-center">
                                  <button className="pt-1 pr-2 pl-2 pb-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={()=>navigate('/movies')}>Tại đây</button>
                              </div>
                          </div>
                          <img src={homeMovieBG}></img>
                      </div>
                  </div>
                  <div className="p-3 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-2">
                          <img className="h-72" src={homeTheaterBG}></img>
                          <div className="flex flex-col space-y-3">
                              <p className="text-2xl font-bold text-gray-500">Xem đánh giá và tham gia đáng giá các rạp chiếu phim bạn yêu thích</p>
                              <div className="flex justify-center">
                                  <button className="pt-1 pr-2 pl-2 pb-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition" onClick={()=>navigate('/Theaters')}>Tại đây</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="h-80 rounded-2xl relative overflow-hidden">
                      <img src={homeCommunityBG} className=" object-cover h-full w-full filter brightness-50 absolute top-0 left-0" />
                      <div className="flex items-center h-24 absolute left-1/2 transform -translate-x-1/2 text-white">
                        <div className="flex flex-col w-[800px] mt-40">
                          <div className="flex justify-center items-center">
                            <p className="font-bold text-2xl">Tham gia cộng đồng của chúng tôi ngay</p>
                          </div>
                          <div className="mt-4 flex justify-center">
                            <button className="pt-1 pr-2 pl-2 pb-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" onClick={()=>navigate('/Community')}>Tại đây</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
