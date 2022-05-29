import { ReactElement } from "react";

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
  svgBackground: any,
  svgForeground: any,
  rooms: IRoom[],
}

export interface IFaculty {
  id: string,
  name: string,
  nameShort: string,
  address: string,
  gmapsLink: string,
  websiteLink: string,
  viewBox: string,
  svgBackground: any | null,
  svgForeground: any | null,
  floors: IFloor[],
}
