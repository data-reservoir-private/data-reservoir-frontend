import { ID_AGGR, MONGODB } from "@/database/db";
import { TransactionMonthlySchema } from "@/model/request/transaction";
import { GetMonthly } from "@/service/transaction";
import { badRequestResponse, internalErrorResponse, newResponse } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";

interface MonthlyResult {
  date: Date,
  tenant: string,
  categories: string[],
  details: {
    category: string,
    order: string,
    quantity: number,
    price: number
  },
  total: number
}

export async function GET(request: NextRequest) {
  try {
    const data = await TransactionMonthlySchema.validate(Object.fromEntries(request.nextUrl.searchParams));
    return NextResponse.json(newResponse(await GetMonthly(data.year, data.month)));
  }
  catch (e) {
    if (e instanceof ValidationError) return badRequestResponse(e.errors[0]);
    else return internalErrorResponse();
  }
}