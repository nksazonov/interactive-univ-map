import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

const Room = ({ room, className, onFocus, onBlur, onMouseOver, onMouseOut, tabIndex }) => {
  let hasStaff = !!room.staff && room.staff.length !== 0;
  return (
    <div
      className={`accordion-item room-block mb-3 border-0 rounded bg-light ${className ? className : ""}`}
      id={room.id}
      tabIndex={tabIndex ? tabIndex : 0}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <h2 className="accordion-header fs-0" id={`panelsStayOpen-heading${room.nameShort}`}>
        <button className={`accordion-button collapsed pb-0 ${!hasStaff ? "no-expand" : ""}`} tabIndex={-1} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${room.nameShort}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${room.nameShort}`}>
          {room.nameShort}
        </button>
        <button className={`accordion-button f-room-desc collapsed pt-0 ${!hasStaff ? "no-expand" : ""}`} tabIndex={-1} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${room.nameShort}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${room.nameShort}`}>
          <div className={`room-type room-${room.category}`}>{room.name}</div>
        </button>
      </h2>
      {
        hasStaff ?
        <div id={`panelsStayOpen-collapse${room.nameShort}`} className="accordion-collapse collapse" aria-labelledby={`panelsStayOpen-heading${room.nameShort}`}>
          <div className="accordion-body">
            <FaUserAlt size={14} className="text-secondary" /> Викладачі:
            { room.staff.map(person => <a className="d-block" href={person.link} key={person.name}>{person.name}</a>) }
          </div>
        </div>
        : null
      }
      
    </div>
  )
};

export default Room;