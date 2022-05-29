import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import { IFaculty, } from '../data/types';
import FacultyItem from './FacultyItem';

const facultySatisfiesQuery = (faculty: IFaculty, query: string) => {
  query = query.toLowerCase();
  const { nameShort, name, address } = faculty;
  if (nameShort.toString().toLowerCase().includes(query) ||
    name.toString().toLowerCase().includes(query) ||
    address.toString().toLowerCase().includes(query)) {
    return true;
  }

  return false;
}

interface IFacultyListProps {
  faculties: IFaculty[],
  searchQuery: string,
  onQueryChange: ChangeEventHandler,
  onItemFocus?: FocusEventHandler,
  onItemBlur?: FocusEventHandler,
  onItemMouseOver?: MouseEventHandler,
  onItemMouseOut?: MouseEventHandler,
  getFacultyClassName?: (faculty: IFaculty) => string,
  className?: string,
}

const FacultyList = ({ faculties, className, searchQuery, onQueryChange, onItemFocus, onItemBlur, onItemMouseOver, onItemMouseOut, getFacultyClassName }: IFacultyListProps) => {
  const removeLastPrefix = (path: string) => path.substring(0, path.lastIndexOf('/') + 1);

  let history = useHistory();

  const forwardToFloorPage = (to: string) => {
    history.push(to);
  }

  return (
    <div className={`p-4 ${className ?? ""}`}>
      <div className="flex items-center">
        <input
          placeholder="🔍 Пошук факультетів"
          className='flex-1 border rounded px-3 py-1.5 outline-gray-300'
          value={searchQuery}
          onChange={onQueryChange}
        />
      </div>

      <div className="">
        {
          faculties
            .filter(faculty => facultySatisfiesQuery(faculty, searchQuery))
            .map(faculty => <FacultyItem
              faculty={faculty}
              facultyLink={window.location.origin + window.location.pathname + faculty.id}
              key={faculty.id}
              className={getFacultyClassName ? getFacultyClassName(faculty) : ""}
              forwardToFaculty={() => forwardToFloorPage(faculty.id + (faculty.floors[0] ? '/' + 'floor-' + faculty.floors[0].num : ''))}
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

export default FacultyList;