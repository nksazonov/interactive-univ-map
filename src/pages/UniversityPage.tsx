import React, {useState} from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import FacultyList from '../components/FacultyList';
import Header from '../components/Header';
import facData from '../data/data.js';
import DataAdapter from '../data/DataAdapter';
import { IFaculty } from '../data/types';

const UniversityPage = () => {
  const [buildingListShown, setBuildingListShown] = useState(true);
  const [facultyQuery, setFacultyQuery] = useState('');

  const getFacultyClassName = (faculty: IFaculty) => {
    let className = "";
    
    // TODO classname selection logic
    className = "faculty-study"
    
    return className;
  }

  // @ts-ignore
  const dataAdapter = new DataAdapter(facData);
  const faculties = dataAdapter.facultiesList();

  return (
    <>
      <div className="px-5 bg-light-gray w-100">
        <Header
          activeBreadcrumbText={ `Київський національний університет імені Тараса Шевченка` }
        />

      </div>

      <div className="flex">

        {
          buildingListShown ?
          <div className='w-1/4 max-h-93vh h-93vh overflow-y-scroll'>
            <FacultyList
              faculties={faculties}
              searchQuery={facultyQuery}
              onQueryChange={e => setFacultyQuery((e.target as HTMLInputElement).value)}
              getFacultyClassName={getFacultyClassName}
            />
          </div>
          : null
        }

        <div
          className={`absolute bottom-0 pl-2 pr-5 py-5 rounded-r-full bg-slate-200 hover:cursor-pointer hover:bg-slate-300 ${buildingListShown ? 'left-1/4' : 'left-0'}`}
          onClick={() => setBuildingListShown(!buildingListShown)}
        >
          <FaChevronLeft size={22} className={`transition rotate inline-block text-slate-400 ${!buildingListShown ? 'rotate-180' : ''}`} />
        </div>

        <div className="flex justify-center items-center flex-1 box-border w-full h-93vh univ-map">
        </div>

      </div>
    </>
  )
}

export default UniversityPage;
