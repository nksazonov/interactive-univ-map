import React, {useState} from 'react'

import FloorItem from '../components/FloorItem'
import CustomLink from '../components/CustomLink'
import Header from '../components/Header'
import { SVGMap } from 'react-svg-map'
import fcsc from '../data/fcsc'
import DataAdapter from '../data/DataAdapter'
import { getLocationName, getLocationId } from '../utils/event-utils';
import { withRouter } from 'react-router-dom'
import { IFloor } from '../data/types'

interface ITooltipStyle {
  display: string,
  top?: number,
  left?: number,
}

const BuildingPage = ({history}: {history: any}) => {
  const [tooltipStyle, setTooltipStyle] = useState({display: 'none'} as ITooltipStyle);

  const [hoveredMapLocationName, setHoveredMapLocationName] = useState('');
  const [hoveredMapLocationId, setHoveredMapLocationId] = useState('');
  const [hoveredListLocationId, setHoveredListLocationId] = useState('');


  const handleItemMouseOver = (event: any) => {
    setHoveredListLocationId(getLocationId(event));
  }

  const handleItemMouseOut = () => {
    setHoveredListLocationId('');
  }
  
  const handleLocationClick = (event: any) => {
    const hoveredMapLocationId = getLocationId(event);
    history.push(`/${hoveredMapLocationId}`);
  }

  const handleLocationMouseOver = (event: any) => {
    setHoveredMapLocationName(getLocationName(event));
    setHoveredMapLocationId(getLocationId(event));
  }

  const handleLocationMouseOut = () => {
    setHoveredMapLocationName('');
    setHoveredMapLocationId('');
    setTooltipStyle({
      display: 'none',
    });
  }

  const handleLocationMouseMove = (event: any) => {
    setTooltipStyle({
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100
    });
  }

  const getLocationClassName = (location: any) => {
		return `${location.id} floor ${hoveredListLocationId === location.id ? "hovered" : ""}`;
	}

  const  dataAdapter = new DataAdapter(fcsc);
  const { map, childrenBefore, childrenAfter } = dataAdapter.facultySVGmap();
  const floors = dataAdapter.floorsList();

  return (
    <>
      <div className="px-5 position-fixed bg-light-gray w-100">
        
        <Header
          activeBreadcrumbText="Факультет комп’ютерних наук та кібернетики"
        />

      </div>

      <div className="p-10 flex flex-col items-center">

        <div className="d-flex justify-content-center mb-10 w-10/12">
          <SVGMap
            map={map}
            locationClassName={getLocationClassName}
            onLocationClick={handleLocationClick}
            onLocationFocus={handleLocationClick}
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

        <div className="grid grid-cols-4 items-center gap-5 text-gray-500">
          {
            floors.map((floor: IFloor) => (
            // @ts-ignore
            <CustomLink
              id={floor.id}
              key={ floor.id }
              to={`/${floor.id}`}
              className="text-secondary"
              onMouseOver={handleItemMouseOver}
              onMouseOut={handleItemMouseOut}
            >
              <FloorItem
                floorNum={ floor.num }
                floorText={ floor.description }
                className={`${hoveredMapLocationId === floor.id ? "bg-gray-200 text-gray-900" : ""}`}
              />
            </CustomLink>
            ))
          }
        </div>
      </div>
    </>
  )
}


export default withRouter(BuildingPage);