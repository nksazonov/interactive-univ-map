import React from 'react';
import { IFloor } from '../data/types';
import CustomLink from '../components/CustomLink';

interface IFloorListProps {
  floors: IFloor[],
  selectedFloorId: string,
  className?: string,
}

const FloorList = ({floors, selectedFloorId, className}: IFloorListProps) => {
  return (
    <div className={`p-4 select-none ${className ?? ''}`}>
      <div className='text-center text-2xl font-medium text-slate-800'>
        {'Поверх'}
      </div>
      <div className='flex flex-col-reverse'>
        {
          floors.map((floor: IFloor) => {
            // @ts-ignore
            return <CustomLink
              className={`flex justify-center box-border mt-4 p-6 bg-slate-50 border-2 border-transparent
              rounded text-3xl ${selectedFloorId === floor.id ? 'bg-slate-300 hover:cursor-default pointer-events-none' : 'hover:cursor-pointer hover:bg-slate-100 hover:border-slate-400'}`}
              to={`/${floor.id}`}
              key={`floor-link-${floor.id}`}
            >
              {floor.num}
            </CustomLink>
          })
        }
      </div>
    </div>
  )
}

export default FloorList;
