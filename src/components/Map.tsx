import React from 'react'

interface IMapProps {
  asset: string,
  width: number,
  height: number,
  className?: string,
}

const Map = ({ className, asset, width, height }: IMapProps) => {
  return (
    <div className={className}>
      <img src={asset} alt="" style={{ width, height }} />
    </div>
  )
}

export default Map;