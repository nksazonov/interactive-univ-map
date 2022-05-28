import React from 'react'

import FloorItem from '../components/FloorItem'
import CustomLink from '../components/CustomLink'
import Header from '../components/Header'
import { SVGMap } from 'react-svg-map'
import fcsc from '../data/fcsc'
import DataAdapter from '../data/DataAdapter'
import { getLocationName, getLocationId } from '../utils/event-utils';

class BuildingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DataAdapter: new DataAdapter(fcsc),
      hoveredMapLocationName: null,
			hoveredMapLocationId: null,
      hoveredListLocationId: null,
			tooltipStyle: {
				display: 'none'
			}
    }

    this.getLocationClassName = this.getLocationClassName.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleItemMouseOver = this.handleItemMouseOver.bind(this); 
		this.handleItemMouseOut = this.handleItemMouseOut.bind(this); 
  }

  handleItemMouseOver(event) {
    const hoveredListLocationId = getLocationId(event);
    this.setState({ hoveredListLocationId });
  }

  handleItemMouseOut() {
    this.setState({ hoveredListLocationId: null });
  }
  
  handleLocationClick(event) {
    const hoveredMapLocationId = getLocationId(event);
    this.props.history.push(`/${hoveredMapLocationId}`);
  }

  handleLocationMouseOver(event) {
    const hoveredMapLocationName = getLocationName(event);
    const hoveredMapLocationId = getLocationId(event);
    this.setState({ hoveredMapLocationName, hoveredMapLocationId });
  }

  handleLocationMouseOut() {
    this.setState({ hoveredMapLocationName: null, hoveredMapLocationId: null, tooltipStyle: { display: 'none' } });
  }

  handleLocationMouseMove(event) {
    const tooltipStyle = {
      display: 'block',
      top: event.clientY + 10,
      left: event.clientX - 100
    };
    this.setState({ tooltipStyle });
  }

  getLocationClassName(location) {
		return `${location.id} floor ${this.state.hoveredListLocationId === location.id ? "hovered" : ""}`;
	}

  render() {
    const { map, childrenBefore, childrenAfter } = this.state.DataAdapter.facultySVGmap();
    const floors = this.state.DataAdapter.floorsList();

    return (
      <>
        <div className="px-5 position-fixed bg-light-gray w-100">
          
          <Header
            tooltip={<span><strong>Оберіть поверх</strong>, натиснувши на нього на мапі або у списку</span>}
            activeBreadcrumb="Факультет комп’ютерних наук та кібернетики"
          />

        </div>

        <div className="p-10 flex flex-col items-center">

          <div className="d-flex justify-content-center mb-10 w-10/12">
            <SVGMap
              map={map}
              locationClassName={this.getLocationClassName}
              onLocationClick={this.handleLocationClick}
              onLocationFocus={this.handleLocationClick}
              onLocationMouseOver={this.handleLocationMouseOver}
              onLocationMouseOut={this.handleLocationMouseOut}
              onLocationMouseMove={this.handleLocationMouseMove}
              childrenBefore={childrenBefore}
              childrenAfter={childrenAfter}
            />
            <div className="fixed bg-white px-12 py-2 border border-gray-400" style={this.state.tooltipStyle}>
              {this.state.hoveredMapLocationName}
            </div>

          </div>

          <div className="grid grid-cols-4 items-center gap-5 text-gray-500">
            {
              floors.map(floor => (
              <CustomLink
                id={floor.id}
                key={ floor.id }
                to={`/${floor.id}`}
                className="text-secondary"
                onMouseOver={this.handleItemMouseOver}
                onMouseOut={this.handleItemMouseOut}
              >
                <FloorItem
                  floorNum={ floor.num }
                  floorText={ floor.description }
                  className={`${this.state.hoveredMapLocationId === floor.id ? "bg-gray-200 text-gray-900" : ""}`}
                />
              </CustomLink>
              ))
            }
          </div>
        </div>
      </>
    )
  }
}

export default BuildingPage;