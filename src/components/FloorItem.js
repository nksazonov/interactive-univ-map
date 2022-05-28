import React from 'react'

const FloorItem = ({ style, className, floorNum, floorText }) => {
  return (
    <div style={style} className={`box-border p-2.5 flex items-center rounded-xl hover:bg-gray-200 hover:text-gray-900 hover:cursor-pointer ${className ?? ''}`}>
      <div className="inline-block text-5xl m-5 text-center">
        { floorNum }
      </div>
      <div className="inline-block text-lg">
        { floorText }
      </div>
    </div>
  )
}

export default FloorItem;