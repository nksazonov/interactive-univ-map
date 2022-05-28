import React from 'react'
import { withRouter , Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

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

  getLocationClassName(location, index) {
		return `${location.id} floor ${this.state.hoveredListLocationId === location.id ? "hovered" : ""}`;
	}

  getItemClassName(item) {
    let className = "";
    if (this.state.hoveredMapLocationId === item.id) {
    className += " hovered";
    }
    if (this.state.selectedMapLocationId === item.id) {
      className += " selected";
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
        <Container fluid className="px-5 position-fixed bg-light-gray header-breadcrumb">
          <Header
            goBack="Обрати поверх"
            goBackLink="/"
            tooltip={<span><strong>Оберіть кабінет</strong>, натиснувши на нього на мапі або у списку</span>}
            activeBreadcrumb={ `Поверх ${floor.num}` }
            breadcrumbs={[ { to: "/", title: "ФКНК" } ]}
          />

        </Container>

        <Container fluid className="px-5 pt-7vh">

          <Row>
            <Col>
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
            </Col>

            <Col xl={9} lg={8} className="d-flex align-items-center">
              <div className="d-flex justify-content-center p-5 max-h-93vh" style={{ flex: 1 }}>
                <SVGMap
                  className="w-75"
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
                <div className="map-tooltip" style={this.state.tooltipStyle}>
                  {this.state.hoveredMapLocationName}
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default withRouter(FloorPage);