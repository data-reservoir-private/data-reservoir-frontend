import { BasePaginationResponse, BaseResponse } from "@/model/response/base";
import { NextResponse } from "next/server";

export function newResponse<T>(data: T, message: string = ""): BaseResponse<T> {
  return ({
    date: new Date(),
    message: message,
    data: data
  });
}

export function newPaginationResponse<T>(data: T[], pageSize: number, currentPage: number, totalPage: number): BasePaginationResponse<T> {
  return ({
    date: new Date(),
    message: "",
    currentPage: currentPage,
    totalPage: totalPage,
    pageSize: pageSize,
    data: data
  });
}

export function badRequestResponse(message: string) {
  return NextResponse.json(newResponse(message), { status: 400 });
}

export function internalErrorResponse(message: string = "Server Error") {
  return NextResponse.json(newResponse(message), { status: 500 });
}