import React, { FocusEventHandler, MouseEventHandler, useState } from 'react';
import { FaChevronDown, FaShareAlt } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { VscGlobe } from 'react-icons/vsc';
import { IFaculty } from '../data/types';

interface IFacultyItemProps {
  faculty: IFaculty,
  facultyLink: string,
  onFocus: FocusEventHandler,
  onBlur?: FocusEventHandler,
  onMouseOver?: MouseEventHandler,
  onMouseOut?: MouseEventHandler,
  className?: string,
  tabIndex?: number,
}

const FacultyItem = ({faculty, facultyLink, onFocus, onBlur, onMouseOver, onMouseOut, className, tabIndex}: IFacultyItemProps) => {
  const [opened, setOpened] = useState(false);

  const handleShareClick = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(facultyLink);
  }

  return (
    <div
      className={`box-border p-4 mt-4 border-2 border-transparent outline-0 rounded select-none bg-slate-50 hover:border-slate-400 hover:bg-slate-100 ${className ?? ""}`}
      id={faculty.id}
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
        <div className='flex items-center justify-between mb-1'>
          <button className={`inline-block text-xl text-slate-800 font-semibold`} tabIndex={-1} >
            {faculty.nameShort}
          </button>

          <div>
            <FaShareAlt
              size={16}
              className="inline-block text-slate-400 hover:cursor-pointer hover:text-slate-600"
              onClick={handleShareClick}
              title="Copy link to clipboard"
            />
            <FaChevronDown
              size={22}
              className={`ml-4 transition rotate inline-block text-slate-400 ${opened ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <button className={`font-medium text-left text-slate-800 leading-tight`} tabIndex={-1} >
          <div className={`inline-block py-1 rounded-md text-md `}>{faculty.name}</div>
        </button>
      </h2>
      {
        opened ?
        <div className="text-slate-600 mt-6">
          <GoLocation size={16} className="inline-block text-secondary" /> <a className='underline cursor-pointer text-blue-600 hover:text-blue-900' href={faculty.gmapsLink}>{faculty.address}</a>
          <br />
          <VscGlobe size={16} className="inline-block text-secondary" /> <a className='underline cursor-pointer text-blue-600 hover:text-blue-900' href={faculty.websiteLink}>Веб сайт</a>
        </div>
        : null
      }
      
    </div>
  )
}

export default FacultyItem;
