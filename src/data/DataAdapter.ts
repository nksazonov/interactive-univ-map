import { IFaculty } from "./types";

class DataAdapter {
  _data: IFaculty[] = [];

  constructor(data: IFaculty[]) {
    this._data = data;
  }

  facultiesList() {
    return this._data;
  }

  facultyMap(faculty_id: string) {
    const faculty = this._data.find(faculty => faculty_id === faculty.id);
    let locations = faculty?.floors.map(floor => {
      const { name, id, path } = floor;
      return { name, id, path }
    });
    return {
      viewBox: faculty?.viewBox,
      locations
    };
  }

  facultySVGmap(faculty_id: string) {
    const faculty = this._data.find(faculty => faculty_id === faculty.id);
    return {
      map: this.facultyMap(faculty_id),
      childrenBefore: faculty?.svgBackground,
      childrenAfter: faculty?.svgForeground
    };
  }

  floorsList(faculty_id: string) {
    const faculty = this._data.find(faculty => faculty_id === faculty.id);
    return faculty?.floors;
  }

  facultyInfo(faculty_id: string) {
    const faculty = this._data.find(faculty => faculty_id === faculty.id);
    const { name, nameShort, id, address, gmapsLink, websiteLink } = faculty!;
    return { name, nameShort, id, address, gmapsLink, websiteLink };
  }

  floor(faculty_id: string, floor_id: string) {
    const faculty = this._data.find(faculty => faculty_id === faculty.id);
    return faculty?.floors.find(floor => floor.id === floor_id);
  }

  floorMap(faculty_id: string, floor_id: string) {
    let floor = this.floor(faculty_id, floor_id);
    let locations = floor?.rooms.map(room => {
      const { name, id, path } = room;
      return { name, id, path }
    });
    return {
      viewBox: floor?.viewBox,
      locations
    };
  }

  floorSVGmap(faculty_id: string, floor_id: string) {
    let floor = this.floor(faculty_id, floor_id);
    return {
      map: this.floorMap(faculty_id, floor_id),
      childrenBefore: floor?.svgBackground,
      childrenAfter: floor?.svgForeground
    }
  }

  roomsList(faculty_id: string, floor_id: string) {
    return this.floor(faculty_id, floor_id)?.rooms;
  }
}

export default DataAdapter;