import { BadRequestError } from "@/model/error/error";
import { BasePaginationResponse, BaseResponse } from "@/model/response/base";
import { ColumnBaseConfig, ColumnDataType, sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import { Redis } from "ioredis";
import { createZodRoute } from "next-zod-route";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodObject } from "zod/v4";

export function newResponse<T>(data: T, message: string = ""): BaseResponse<T> {
  return ({
    date: new Date(),
    message: message,
    data: data
  });
}

function okResponse<T>(data: T, message: string = "") {
  return NextResponse.json(newResponse(data satisfies T, message));
}

export function paginationResponse<T>(data: T[], pageSize: number, currentPage: number, totalPage: number): BasePaginationResponse<T> {
  return ({
    date: new Date(),
    message: "",
    currentPage: currentPage,
    totalPage: totalPage,
    pageSize: pageSize,
    data: data
  });
}

function badRequestResponse(message: string) {
  return NextResponse.json(newResponse(message), { status: 400 });
}

function internalErrorResponse(message: string = "Server Error") {
  return NextResponse.json(newResponse(message), { status: 500 });
}

export const routeInstance = createZodRoute({
  handleServerError: (error) => {
    return NextResponse.json(newResponse(null, error.message), { status: 500 });
  }
});

const getRedis = async <TResult>(key: string): Promise<TResult | undefined> => {
  try {
    console.log(process.env.REDIS_URL);
    const R = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1 });
    const result = await R.get(key);
    return result ? JSON.parse(result) as TResult : undefined;
  }
  catch (e) {
    // console.log(e);
    return undefined;
  }
}

const setRedis = async <TResult>(key: string, value: TResult) => {
  try {
    console.log(process.env.REDIS_URL);
    const R = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1 });
    await R.set(key, JSON.stringify(value));
  }
  catch (e) {
    // console.log(e);
    return;
  }
}

export interface GETMethodRouteOption {
  cache: boolean
}

export const GETMethodRoute = <TResponse, TSchema extends ZodObject>(
  schema: TSchema,
  handler: (req: NextRequest, query: z.infer<TSchema>) => Promise<TResponse>,
  option: GETMethodRouteOption = { cache: false }
) => {
  return async (req: NextRequest, { params }: { params: Promise<{ [key: string]: any }> }) => {
    // Redis
    console.log(process.env.REDIS_URL);
    const hasRedis = !!(option && option.cache);
    const redisKey = req.nextUrl.pathname + req.nextUrl.href;
    if (hasRedis) {
      const r = await getRedis<TResponse>(redisKey);
      if (r) return okResponse(r);
    }

    const d = await params;
    const finalData: { [key: string]: any } = { ...d }
    for (const [key, value] of req.nextUrl.searchParams) {
      const v = finalData[key];
      if (v === undefined) finalData[key] = value;
      else if (v !== undefined && !Array.isArray(v)) finalData[key] = [v, value];
      else if (Array.isArray(v)) finalData[key] = [...v, value];
    }

    const result = await schema.safeParseAsync(finalData);
    if (result.error) return badRequestResponse(result.error.issues.map(x => x.message).join(', '));

    try {
      const resp = await handler(req, result.data);
      if (hasRedis) {
        const name = req.nextUrl.pathname;
        await setRedis(name, resp);
      }
      return okResponse(resp);
    }
    catch (e) {
      if (e instanceof BadRequestError) return badRequestResponse(e.message);
      return internalErrorResponse();
    }
  }
}

export function resolveImageSQL<TCol extends ColumnBaseConfig<ColumnDataType, string>>(column: PgColumn<TCol>, columnAlias: string = "image") {
  return sql<string>`${process.env.IMAGE_URL} || ${column}`.as(columnAlias)
}
export function resolveImage(imagePath: string) {
  return `${process.env.IMAGE_URL}${imagePath}`;
}