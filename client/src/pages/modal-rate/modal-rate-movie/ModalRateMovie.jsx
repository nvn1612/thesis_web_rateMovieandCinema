import React from 'react'
import { Modal } from '../../../components/modal/Modal'
import { ImageContent } from '../../../components/image-content/ImageContent'
import { ContentModalRate } from '../../../layouts/content-modal-rate/ContentModalRate'
export const ModalRateMovie = () => {
  return (
    <>
        <Modal label="Đáng giá phim">
            <div className="flex p-4">
                <div className="w-2/4 flex justify-center">
                    <ImageContent width="w-[200px]" height="h-[290px]" size_rounded="xl" image="https://motchillzv.com/storage/images/trum-com-va-ac-quy/trum-com-va-ac-quy-thumb.jpg"/>
                </div>
                <div className="w-2/4">
                    <ContentModalRate 
                        label_1="Nội dung phim"
                        label_2="Diễn xuất    "
                        label_3="Kỹ xảo"
                        label_4="Âm thanh"
                        label_5="Đạo diễn"
                        label_6="Tính giải trí"
                        />
                </div>
            </div>
        </Modal>
    </>
  )
}           
