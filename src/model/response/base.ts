import { BaseSchema } from "@/database/schema/base";

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
  id: string
}

export interface BaseMongoResponseData extends Omit<BaseSchema, '_id'>, HasID { }

export type MongoSchemaNoID<TType> = Omit<TType, '_id'> & HasID;