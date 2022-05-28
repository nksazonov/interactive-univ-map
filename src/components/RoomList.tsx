import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react'
import { IRoom } from '../data/types';
import Room from './Room'

const roomSatisfiesQuery = (room: IRoom, query: string) => {
  query = query.toLowerCase();
  const { nameShort, name, staff } = room;
  if (nameShort.toString().toLowerCase().includes(query) || name.toString().toLowerCase().includes(query)) {
    return true;
  }

  if (staff) {
    for (const staffObj of staff) {
      if (staffObj.name.toLowerCase().includes(query)) {
        return true;
      }
    }
  }

  return false;
}

interface IRoomListProps {
  rooms: IRoom[],
  searchQuery: string,
  onQueryChange: ChangeEventHandler,
  onItemFocus: FocusEventHandler,
  onItemBlur: FocusEventHandler,
  onItemMouseOver: MouseEventHandler,
  onItemMouseOut: MouseEventHandler,
  getRoomClassName?: (room: IRoom) => string,
  className?: string,
}

const RoomList = ({ rooms, className, searchQuery, onQueryChange, onItemFocus, onItemBlur, onItemMouseOver, onItemMouseOut, getRoomClassName }: IRoomListProps) => {
  return (
    <div className={`p-4 ${className ?? ""}`}>
      <div className="py-4">
        <input
          placeholder="🔍 Пошук кімнат"
          className='w-full border rounded px-3 py-1.5 outline-gray-300'
          value={searchQuery}
          onChange={onQueryChange}
        />
      </div>

      <div className="">
        {
          rooms
          .filter(room => roomSatisfiesQuery(room, searchQuery))
          .map(room => <Room
            room={room}
            key={room.id}
            className={getRoomClassName ? getRoomClassName(room) : ""}
            onFocus={onItemFocus}
            onBlur={onItemBlur}
            onMouseOver={onItemMouseOver}
            onMouseOut={onItemMouseOut}
          />)
        }
      </div>
    </div>
  )
}

export default RoomList;