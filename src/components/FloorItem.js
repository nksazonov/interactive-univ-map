import React from 'react'

const FloorItem = ({ style, className, floorNum, floorText }) => {
  return (
    <div style={style} className={`fi-block ${className ? className : ''}`}>
      <div className="fi-num">
        { floorNum }
      </div>
      <div className="fi-text">
        { floorText }
      </div>
    </div>
  )
}

export default FloorItem;