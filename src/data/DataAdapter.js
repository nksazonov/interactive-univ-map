class DataAdapter {
  constructor(data) {
    this._data = data;
  }

  facultyMap() {
    let locations = this._data.floors.map(floor => {
      const { name, id, path } = floor;
      return { name, id, path }
    });
    return {
      viewBox: this._data.viewBox,
      locations
    };
  }

  facultySVGmap() {
    return {
      map: this.facultyMap(),
      childrenBefore: this._data.svgBackground,
      childrenAfter: this._data.svgForeground
    };
  }

  floorsList() {
    return this._data.floors;
  }

  facultyInfo() {
    const { title, titleShort, id } = this._data;
    return { title, titleShort, id };
  }

  floor(floor_id) {
    return this._data.floors.find(floor => floor.id === floor_id);
  }

  floorMap(floor_id) {
    let floor = this.floor(floor_id);
    let locations = floor.rooms.map(room => {
      const { name, id, path } = room;
      return { name, id, path }
    });
    return {
      viewBox: floor.viewBox,
      locations
    };
  }

  floorSVGmap(floor_id) {
    let floor = this.floor(floor_id);
    return {
      map: this.floorMap(floor_id),
      childrenBefore: floor.svgBackground,
      childrenAfter: floor.svgForeground
    }
  }

  roomsList(floor_id) {
    return this.floor(floor_id).rooms;
  }
}

export default DataAdapter;