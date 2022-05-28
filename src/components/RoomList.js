import React from 'react'
import Room from './Room'

const roomSatisfiesQuery = (room, query) => {
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

const RoomList = ({ rooms, className, searchQuery, onQueryChange, onItemFocus, onItemBlur, onItemMouseOver, onItemMouseOut, itemClassName }) => {
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
            className={itemClassName ? itemClassName(room) : ""}
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