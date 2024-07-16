import React from 'react'

export const ImageContent = ({image,width, height,size_rounded}) => {
  return (
    <div className="image-summary-movie">
          <img className={`rounded-${size_rounded} ${width} ${height} `} src={image} alt="" />
    </div>
  )
}
