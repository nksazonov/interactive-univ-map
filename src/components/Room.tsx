import React, {FocusEventHandler, MouseEventHandler, useState} from 'react'
import { FaUserAlt, FaChevronDown } from 'react-icons/fa'

import {IRoom} from '../data/types';

interface IRoomProps {
  room: IRoom,
  onFocus: FocusEventHandler,
  onBlur: FocusEventHandler,
  onMouseOver: MouseEventHandler,
  onMouseOut: MouseEventHandler,
  className?: string,
  tabIndex?: number,
}

const Room = ({ room, className, onFocus, onBlur, onMouseOver, onMouseOut, tabIndex } : IRoomProps) => {
  const [opened, setOpened] = useState(false);
  let hasStaff = !!room.staff && room.staff.length !== 0;
  return (
    <div
      className={`box-border p-4 mt-4 border-2 border-transparent outline-0 rounded select-none bg-slate-50 hover:border-slate-400 hover:bg-slate-100 ${hasStaff ? "hover:cursor-pointer" : ''} ${className ?? ""}`}
      id={room.id}
      tabIndex={tabIndex ? tabIndex : 0}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <h2
        className="text-0"
        onClick={() => setOpened(!opened)}
      >
        <div className='flex items-center justify-between'>
          <button className={`inline-block text-xl text-slate-800 font-semibold pb-0`} tabIndex={-1} >
            {room.nameShort}
          </button>
          {
            hasStaff ?
            <FaChevronDown size={22} className={`transition rotate inline-block text-slate-400 ${opened ? 'rotate-180' : ''}`} />
            : <div />
          }
        </div>
        <button className={`font-medium text-left text-slate-800 leading-tight`} tabIndex={-1} >
          <div className={`inline-block px-1.5 py-1 rounded-md text-md room-${room.category}`}>{room.name}</div>
        </button>
      </h2>
      {
        hasStaff ?
          opened ?
          <div className="text-slate-600 mt-6">
            <FaUserAlt size={14} className="inline-block text-secondary" /> Викладачі:
            { room.staff!.map(person => <a className="block text-blue-500 underline hover:text-blue-700" href={person.link} key={person.name}>{person.name}</a>) }
          </div>
          : null
        : null
      }
      
    </div>
  )
};

export default Room;