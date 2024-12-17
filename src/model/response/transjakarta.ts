import { HasID } from "./base";

export interface TransjakartaCorridorResponse extends HasID {
  category: string;
  code: string;
  name: string;
  color: string;
  problems: number;
}

export interface TransjakartaCorridorDetailResponse extends HasID {
  category: string;
  code: string;
  name: string;
  color: string;
  problems: number;
  schedule: {
    day: boolean
    end_north: number;
    end_south: number;
    night: boolean;
    peak_day: boolean;
    peak_evening: boolean;
    start_north: number;
    start_south: number;
    weekday: boolean;
    weekend: boolean;
  }[];
  stops: {
    brt: boolean;
    bus_stop_code: number;
    direction: string;
    latitude: number;
    longitude: number;
    order: number;
    permanently_closed: boolean;
  }[]
}

export interface TransjakartaBusStopResponse extends HasID {
  brt: boolean;
  code: number;
  latitude: number;
  longitude: number;
  name: string;
  permanently_closed: boolean;
} 

export interface TransjakartaBusStopDetailResponse extends HasID {
  brt: boolean;
  code: number;
  effective_date: Date;
  is_deleted: boolean;
  latitude: number;
  link: string;
  longitude: number;
  name: string;
  permanently_closed: boolean;
  corridors: {
    category: string
    code: string
    color: string
    name: string
  }[];
} 