import { BasePaginationResponse, BaseResponse } from "@/model/response/base";
import { escapeRegExp } from "lodash";
import { Document } from "mongodb";
import { createZodRoute } from "next-zod-route";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodObject, ZodSchema } from "zod";

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

export const routeInstance = createZodRoute({
  handleServerError: (error) => {
    return NextResponse.json(newResponse(null, error.message), { status: 500 });
  }
});

export const GETMethodRoute = <TSchema extends ZodSchema>(schema: TSchema, handler: (req: NextRequest, query: z.output<TSchema>) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {

    const finalData: { [key: string]: any } = {}
    for (const [key, value] of req.nextUrl.searchParams) {
      const v = finalData[key];
      if (v === undefined) finalData[key] = value;
      else if (v !== undefined && !Array.isArray(v)) finalData[key] = [v, value];
      else if (Array.isArray(v)) finalData[key] = [...v, value];
    }

    const result = await schema.safeParseAsync(finalData);
    if (result.error) return NextResponse.json(badRequestResponse(result.error.message));

    else return handler(req, result.data);
  }
}




export class MongoDBHelper {
  static addPagination(currentPage: number, pageSize: number) {
    const arr: Document[] = [{ $skip: (currentPage - 1) * pageSize }];
    if (pageSize > 0) arr.push({ $limit: pageSize });
    return arr;
  }

  static uuidToString(fieldName: string) {
    return {
      $addFields: {
        [fieldName]: { $convert: {input: `$${fieldName}`, format: 'uuid', to: { subtype: 4, type: 2 }}}
      }
    }
  }

  static dateFromString(fieldName: string) {
    return {
      $dateFromString: {
        dateString: fieldName
      }
    }
  }

  static createPipeline(...params: (Document[] | Document | undefined)[]): Document[] {
    return params.reduce<Document[]>((acc, curr) => {
      if (!curr) return acc;
      else if (Array.isArray(curr)) return [...acc, ...curr]
      else return [...acc, curr];
    }, []) as Document[]
  }

  static unset(...params: string[]) {
    return {
      $unset: params
    }
  }

  static equalString(expression1: string, expression2: string): Document[] {
    return [
      {
        $match: {
          $expr:
          {
            $eq: [ { $strcasecmp: [expression1, expression2] }, 0]
          }
        }
      }
    ]
  }
  
  static like(field: string, query: string) {
    const esc = escapeRegExp(query);
    return [
      {
        $match: {
          [field]: {
            $regex: esc,
            $options: 'i'
          }
        }
      }
    ]
  }
}
