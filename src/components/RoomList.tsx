import React, { useState, ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import {FaRegBuilding, FaBuilding} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { IFloor, IRoom } from '../data/types';
import Room from './Room';

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
  floors: IFloor[],
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

const RoomList = ({ floors, rooms, className, searchQuery, onQueryChange, onItemFocus, onItemBlur, onItemMouseOver, onItemMouseOut, getRoomClassName }: IRoomListProps) => {
  const [searchAll, setSearchAll] = useState(false);

  const removeLastPrefix = (path: string) => path.substring(0, path.lastIndexOf('/') + 1);

  let history = useHistory();

  const forwardToFloorPage = (to: string) => {
    setSearchAll(false);
    history.push(to);
  }

  const getPath = (floorNum: number, roomId: string) => removeLastPrefix(window.location.pathname) + 'floor-' + floorNum + '?selectedRoom=' + roomId;

  return (
    <div className={`p-4 ${className ?? ""}`}>
      <div className="flex items-center">
        <input
          placeholder="🔍 Пошук аудиторій"
          className='flex-1 border rounded px-3 py-1.5 outline-gray-300'
          value={searchQuery}
          onChange={onQueryChange}
        />
        {
          searchAll ?
          <FaBuilding
            size={36}
            className="inline-block -mr-1 ml-4 text-slate-600 cursor-pointer hover:text-slate-500"
            title="Пошук тільки по вибраному поверху"
            onClick={() => setSearchAll(false)}
          />
          : <FaRegBuilding
              size={36}
              className="inline-block -mr-1 ml-4 text-slate-200 cursor-pointer hover:text-slate-300"
              title="Пошук по всіх поверхах"
              onClick={() => setSearchAll(true)}
            />
        }
      </div>

      <div className="">
        {
          searchAll ?
          floors
          .map(floor => floor.rooms
            .filter(room => roomSatisfiesQuery(room, searchQuery))
            .map(room => <Room
            room={room}
            roomLink={window.location.origin + getPath(floor.num, room.id)}
            key={room.id}
            className={getRoomClassName ? getRoomClassName(room) : ""}
            onFocus={() => forwardToFloorPage('floor-' + floor.num + '?selectedRoom=' + room.id)}
            onBlur={onItemBlur}
            onMouseOver={onItemMouseOver}
            onMouseOut={onItemMouseOut}
          />))
          : rooms
            .filter(room => roomSatisfiesQuery(room, searchQuery))
            .map(room => <Room
              room={room}
              roomLink={window.location.origin + window.location.pathname + '?selectedRoom=' + room.id}
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