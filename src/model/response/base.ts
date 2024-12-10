import { BaseSchema } from "@/database/mongodb/schema/base";
import { UUID } from "crypto";

export interface BaseResponse<T> {
  date: Date,
  message: string,
  data: T
}

export interface BasePaginationResponse<T> {
  date: Date,
  message: string,

  currentPage: number,
  pageSize: number,
  totalPage: number,
  data: T[]
}

export interface HasID { 
  id: UUID
}

export interface BaseMongoResponseData extends Omit<BaseSchema, '_id'>, HasID { }