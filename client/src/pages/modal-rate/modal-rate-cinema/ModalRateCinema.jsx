import React from 'react'
import { Modal } from '../../../components/modal/Modal'
import { ImageContent } from '../../../components/image-content/ImageContent'
import { ContentModalRate } from '../../../layouts/content-modal-rate/ContentModalRate'
export const ModalRateCinema = () => {
  return (
    <>
        <Modal label="Đánh giá rạp chiếu">
        <div className="flex p-4">
                <div className="w-2/4 flex justify-center">
                    <ImageContent width="w-[200px]" height="h-[290px]"  image="https://i.gyazo.com/f42624877a99b415498194df29e2e45b.png"/>
                </div>
                <div className="w-2/4">
                    <ContentModalRate 
                        label_1="Chất lượng hình ảnh"
                        label_2="Chất lượng âm thanh"
                        label_3="Ghê ngồi"
                        label_4="Không gian rạp"
                        label_5="Dịch vụ khách hàng"
                        label_6="Giá vé"
                        />
                </div>
            </div>
        </Modal>
    </>
  )
}
