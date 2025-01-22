import { UUID } from "mongodb";
import { BaseSchema } from "./base";

export interface TransjakartaCorridorSchema extends BaseSchema {
  category: string;
  code: string;
  color: string;
  date_end: Date | null;
  date_start: Date | null;
  effective_date: Date
  image: string;
  is_deleted: boolean;
  name: string;
  picture_effective_date: Date;
  schedule: {
    id: UUID;
    day: boolean
    end_north: number;
    end_south: number;
    night: boolean;
    peak_day: boolean;
    peak_evening: boolean;
    start_north: number;
    start_south: number;
    location_end_north: string;
    location_end_south: string;
    location_start_north: string;
    location_start_south: string;
    weekday: boolean;
    weekend: boolean;
  }[];
  stops: {
    id: UUID;
    brt: boolean;
    bus_stop_code: number;
    name: string;
    direction: string;
    latitude: number;
    longitude: number;
    order: number;
    permanently_closed: boolean;
  }[]
}

export interface TransjakartBusStopSchema extends BaseSchema {
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