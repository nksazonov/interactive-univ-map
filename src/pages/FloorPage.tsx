import React, {useState, useEffect} from 'react';
import { withRouter, Redirect, useParams, useLocation } from 'react-router-dom';

import RoomList from '../components/RoomList';
import Header from '../components/Header';
import { SVGMap } from 'react-svg-map';
import fcsc from '../data/fcsc';
import DataAdapter from '../data/DataAdapter';
import { getLocationName, getLocationId } from '../utils/event-utils';
import { IFloor, IRoom } from '../data/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FloorList from '../components/FloorList';

interface ITooltipStyle {
  display: string,
  top?: number,
  left?: number,
}

const FloorPage = ({history}: {history: any}) => {
  const [roomQuery, setRoomQuery] = useState('');
  const [tooltipStyle, setTooltipStyle] = useState({display: 'none'} as ITooltipStyle);
  const [roomListShown, setRoomListShown] = useState(true);
  const [floorListShown, setFloorListShown] = useState(true);

  const [hoveredMapLocationName, setHoveredMapLocationName] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [hoveredLocationId, setHoveredLocationId] = useState('');


  const location = useLocation();
  useEffect(() => {
    let params = new URLSearchParams(location.search);
    const roomId = params.get('selectedRoom');
    if (roomId) {
      setSelectedLocationId(roomId);
    }
  }, []);

  useEffect(() => {
    if (selectedLocationId) {
      history.replace(location.pathname + '?selectedRoom=' + (selectedLocationId));
    } else {
      history.replace(location.pathname);
    }
  }, [selectedLocationId]);

  const handleItemFocus = (event: any) => {
    setSelectedLocationId(getLocationId(event));
  }

  const handleItemBlur = () => {
    setSelectedLocationId('');
  }

  const handleItemMouseOver = (event: any) => {
    setHoveredLocationId(getLocationId(event));
  }

  const handleItemMouseOut = () => {
    setHoveredLocationId('');
  }
  
  const handleLocationFocus = (event: any) => {
    setSelectedLocationId(getLocationId(event));
  }

  const handleLocationBlur = () => {
    setSelectedLocationId('');
  }

  const handleLocationMouseOver = (event: any) => {
    setHoveredMapLocationName(getLocationName(event));
    setHoveredLocationId(getLocationId(event));
  }

  const handleLocationMouseOut = () => {
    setHoveredMapLocationName('');
    setHoveredLocationId('');
    setTooltipStyle({display: 'none'});
  }

  const handleLocationMouseMove = (event: any) => {
    setTooltipStyle({
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100
    });
  }

  const getLocationClassName = (location: any) =>  {
    let className = "";

    if (hoveredLocationId === location.id ||
      selectedLocationId === location.id) {
      className += " hovered"
    }

		return `${location.id} floor ${className}`;
	}

  const getRoomClassName = (room: IRoom) => {
    let className = "";
    if (hoveredLocationId === room.id ||
      selectedLocationId === room.id) {
      className += " bg-slate-100 border-slate-400";
    }
    
    return className;
  }
  
  const dataAdapter = new DataAdapter(fcsc);

  //@ts-ignore
  const { floorId } = useParams();
  const floors = dataAdapter.floorsList();
  const floor = floors.find((floor: IFloor) => floor.id === floorId);

  if (!floor) {
    return <Redirect to='/404-page-not-found' />
  }

  const { map, childrenBefore, childrenAfter } = dataAdapter.floorSVGmap(floorId);
  const rooms = dataAdapter.roomsList(floorId);

  return (
    <>
      <div className="px-5 bg-light-gray w-100">
        <Header
          goBackText="Обрати поверх"
          goBackLink="/"
          activeBreadcrumbText={ `Поверх ${floor.num}` }
          breadcrumbs={[ { to: "/", text: "ФКНК" } ]}
        />

      </div>

      <div className="flex">

        {
          roomListShown ?
          <div className='w-1/4 max-h-93vh h-93vh overflow-y-scroll'>
            <RoomList
              rooms={rooms}
              searchQuery={roomQuery}
              onQueryChange={e => setRoomQuery((e.target as HTMLInputElement).value)}
              onItemFocus={handleItemFocus}
              onItemBlur={handleItemBlur}
              onItemMouseOver={handleItemMouseOver}
              onItemMouseOut={handleItemMouseOut}
              getRoomClassName={getRoomClassName}
            />
          </div>
          : null
        }

        <div
          className={`absolute bottom-0 pl-2 pr-5 py-5 rounded-r-full bg-slate-200 hover:cursor-pointer hover:bg-slate-300 ${roomListShown ? 'left-1/4' : 'left-0'}`}
          onClick={() => setRoomListShown(!roomListShown)}
        >
          <FaChevronLeft size={22} className={`transition rotate inline-block text-slate-400 ${!roomListShown ? 'rotate-180' : ''}`} />
        </div>

        <div className="flex justify-center items-center flex-1 box-border max-h-75 h-75vh mt-7vh">
          <SVGMap
            className="w-10/12 max-h-93vh py-12 box-border"
            map={map}
            locationClassName={getLocationClassName}
            onLocationFocus={handleLocationFocus}
            onLocationBlur={handleLocationBlur}
            onLocationMouseOver={handleLocationMouseOver}
            onLocationMouseOut={handleLocationMouseOut}
            onLocationMouseMove={handleLocationMouseMove}
            childrenBefore={childrenBefore}
            childrenAfter={childrenAfter}
          />
          <div className="fixed bg-white px-12 py-2 border border-gray-400" style={tooltipStyle}>
            {hoveredMapLocationName}
          </div>
        </div>

        <div
          className={`absolute bottom-0 pr-2 pl-5 py-5 rounded-l-full bg-slate-200 hover:cursor-pointer hover:bg-slate-300 ${floorListShown ? 'right-1/12' : 'right-0'}`}
          onClick={() => setFloorListShown(!floorListShown)}
        >
          <FaChevronRight size={22} className={`transition rotate inline-block text-slate-400 ${!floorListShown ? 'rotate-180' : ''}`} />
        </div>

        {
          floorListShown ?
          <div className='self-center justify-self-end w-1/12 flex flex-col max-h-93vh h-93vh overflow-y-scroll rtl'>
            <FloorList
              floors={floors}
              selectedFloorId={floorId}
            />
          </div>
          : null
        }

      </div>
    </>
  )
}

export default withRouter(FloorPage);