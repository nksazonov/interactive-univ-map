import React, {useState} from 'react'
import { withRouter , Redirect } from 'react-router-dom'

import RoomList from '../components/RoomList'
import Header from '../components/Header'
import { SVGMap } from 'react-svg-map'
import fcsc from '../data/fcsc'
import DataAdapter from '../data/DataAdapter'
import { getLocationName, getLocationId } from '../utils/event-utils';
import { IFloor, IRoom } from '../data/types'
import { useParams } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

interface ITooltipStyle {
  display: string,
  top?: number,
  left?: number,
}

const FloorPage = () => {
  const [roomQuery, setRoomQuery] = useState('');
  const [tooltipStyle, setTooltipStyle] = useState({display: 'none'} as ITooltipStyle);
  const [roomListShown, setRoomListShown] = useState(true);

  const [hoveredMapLocationName, setHoveredMapLocationName] = useState('');
  const [hoveredMapLocationId, setHoveredMapLocationId] = useState('');
  const [hoveredListLocationId, setHoveredListLocationId] = useState('');
  const [selectedMapLocationId, setSelectedMapLocationId] = useState('');
  const [selectedListLocationId, setSelectedListLocationId] = useState('');

  //preselectedRoom: null,

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const preselectedRoom = query.get("room");
  //   this.setState({ preselectedRoom }); // TODO
  // }

  const handleItemFocus = (event: any) => {
    setSelectedListLocationId(getLocationId(event));
  }

  const handleItemBlur = () => {
    setSelectedListLocationId('');
  }

  const handleItemMouseOver = (event: any) => {
    setHoveredListLocationId(getLocationId(event));
  }

  const handleItemMouseOut = () => {
    setHoveredListLocationId('');
  }
  
  const handleLocationFocus = (event: any) => {
    setSelectedMapLocationId(getLocationId(event));
  }

  const handleLocationBlur = () => {
    setSelectedMapLocationId('');
  }

  const handleLocationMouseOver = (event: any) => {
    setHoveredMapLocationName(getLocationName(event));
    setHoveredMapLocationId(getLocationId(event));
  }

  const handleLocationMouseOut = () => {
    setHoveredMapLocationName('');
    setHoveredMapLocationId('');
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

    if (hoveredListLocationId === location.id ||
      selectedListLocationId === location.id) {
      className += " hovered"
    }

		return `${location.id} floor ${className}`;
	}

  const getRoomClassName = (room: IRoom) => {
    let className = "";
    if (hoveredMapLocationId === room.id ||
      selectedListLocationId === room.id ||
      selectedMapLocationId === room.id) {
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

        <div className="flex justify-center items-center flex-1 box-border max-h-75 h-75vh ">
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

      </div>
    </>
  )
}

export default withRouter(FloorPage);