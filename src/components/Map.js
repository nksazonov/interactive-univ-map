import React from 'react'

const Map = ({ style, className, svg, asset, width, height }) => {
  return (
    <div style={ style } className={className}>
      <img src={asset} alt="" style={{ width, height }} />
    </div>
  )
}

export default Map;