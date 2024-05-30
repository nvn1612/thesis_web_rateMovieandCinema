import React from 'react'
import {ProgressBarGroup} from '../../layouts/progress-bar-group/ProgressBarGroup'
import { TotalRate } from '../../components/total-rate/TotalRate'
import { CountRate } from '../../components/count-rate/CountRate'
import { ReviewsSection } from '../../components/reviews-section/ReviewsSection'
export const RateMovie = () => {
  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
        <ProgressBarGroup
            label_1="Nội dung phim"
            label_2="Diễn xuất"
            label_3="kỹ xảo"
            label_4="Âm thanh"
            label_5="Đạo diễn"
            label_6="Tính giải trí"
        />
        <div className="flex space-x-3">
            <TotalRate/>
            <CountRate/>
        </div>
        <ReviewsSection/>
    </div>
  )
}
