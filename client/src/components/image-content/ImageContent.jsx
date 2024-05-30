import React from 'react'

export const ImageContent = ({image,width, height}) => {
  return (
    <div className="image-summary-movie">
          <img className={`rounded-lg ${width} ${height} `} src={image} alt="" />
    </div>
  )
}
