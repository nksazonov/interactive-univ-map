import React from 'react'
import { Form } from 'react-bootstrap'
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
    <div className={`rooms-list ${className ? className : ""}`}>
      <Form className="py-4">
        <Form.Control
          as="input"
          placeholder="🔍 Пошук кімнат"
          value={searchQuery}
          onChange={onQueryChange}
        />
      </Form>

      <div className="accordion" id="accordionPanelsStayOpenExample">
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