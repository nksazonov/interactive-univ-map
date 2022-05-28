import React from 'react'
import { withRouter , Redirect } from 'react-router-dom'

import RoomList from '../components/RoomList'
import Header from '../components/Header'
import { SVGMap } from 'react-svg-map'
import fcsc from '../data/fcsc'
import DataAdapter from '../data/DataAdapter'
import { getLocationName, getLocationId } from '../utils/event-utils';

class FloorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preselectedRoom: null,
      roomQuery: "",
      DataAdapter: new DataAdapter(fcsc),
      hoveredMapLocationName: null,
			hoveredMapLocationId: null,
      hoveredListLocationId: null,
      selectedMapLocationId: null,
      selectedListLocationId: null,
			tooltipStyle: {
				display: 'none'
			}
    }

    this.getLocationClassName = this.getLocationClassName.bind(this);
    this.getItemClassName = this.getItemClassName.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.handleItemFocus = this.handleItemFocus.bind(this);
		this.handleItemBlur = this.handleItemBlur.bind(this);
		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleItemMouseOver = this.handleItemMouseOver.bind(this); 
		this.handleItemMouseOut = this.handleItemMouseOut.bind(this); 
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const preselectedRoom = query.get("room");
    this.setState({ preselectedRoom }); // TODO
  }

  handleItemFocus(event) {
    const selectedItemLocationId = getLocationId(event);
    console.log('item focus');
    this.setState({ selectedItemLocationId });
  }

  handleItemBlur() {
    this.setState({ selectedItemLocationId: null });
  }

  handleItemMouseOver(event) {
    const hoveredListLocationId = getLocationId(event);
    this.setState({ hoveredListLocationId });
  }

  handleItemMouseOut() {
    this.setState({ hoveredListLocationId: null });
  }
  
  handleLocationFocus(event) {
    const selectedMapLocationId = getLocationId(event);
    console.log('location focus');
    this.setState({ selectedMapLocationId });
  }

  handleLocationBlur() {
    this.setState({ selectedMapLocationId: null });
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

  getItemClassName(item) {
    let className = "";
    if (this.state.hoveredMapLocationId === item.id) {
      className += " bg-slate-100 border-slate-400";
    }
    if (this.state.selectedMapLocationId === item.id) {
      className += " bg-slate-100 border-slate-400";
    }
    
    return className;
  }
  
  render() {
    const { floorId } = this.props.match.params;
    const floors = this.state.DataAdapter.floorsList();
    const floor = floors.find(floor => floor.id === floorId);

    if (!floor) {
      return <Redirect to='/404-page-not-found' />
    }

    const { map, childrenBefore, childrenAfter } = this.state.DataAdapter.floorSVGmap(floorId);
    const rooms = this.state.DataAdapter.roomsList(floorId);

    return (
      <>
        <div className="px-5 bg-light-gray w-100">
          <Header
            goBack="Обрати поверх"
            goBackLink="/"
            activeBreadcrumb={ `Поверх ${floor.num}` }
            breadcrumbs={[ { to: "/", title: "ФКНК" } ]}
          />

        </div>

        <div className="flex">

          <div className='w-1/4 max-h-93vh overflow-y-scroll'>
            {/* TODO: make onFocus on Room block work. Now focuse appears on its children */}
            <RoomList
              rooms={rooms}
              searchQuery={this.state.roomQuery}
              onQueryChange={e => this.setState({ roomQuery: e.target.value })}
              onItemFocus={this.onItemFocus}
              onItemBlur={this.onItemBlur}
              onItemMouseOver={this.handleItemMouseOver}
              onItemMouseOut={this.handleItemMouseOut}
              itemClassName={this.getItemClassName}
            />
          </div>

          <div className="flex justify-center items-center flex-1 box-border max-h-75 ">
            <SVGMap
              className="w-10/12 max-h-93vh py-12 box-border"
              map={map}
              locationClassName={this.getLocationClassName}
              onLocationFocus={this.handleLocationFocus}
              onLocationBlur={this.handleLocationBlur}
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

        </div>
      </>
    )
  }
}

export default withRouter(FloorPage);