export type IRoomCategories = 'study' | 'department' | 'head' | 'other';

export interface IPerson {
  name: string,
  link: string,
}

export interface IRoom {
  id: string,
  nameShort: string,
  name: string,
  category: IRoomCategories,
  path: string,
  staff?: IPerson[],
}

export interface IFloor {
  num: number,
  id: string,
  name: string,
  description: string,
  path: string,
  viewBox: string,
  svgBackground: JSX.IntrinsicElements,
  svgForeground: JSX.IntrinsicElements,
  rooms: IRoom[],
}

export interface IFaculty {
  id: string,
  name: string,
  nameShort: string,
  viewBox: string,
  svgBackground: JSX.IntrinsicElements,
  svgForeground: JSX.IntrinsicElements,
  floors: IFloor[],
}
