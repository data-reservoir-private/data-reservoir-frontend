import { ID_AGGR, MONGODB } from "@/database/db";
import { DB_SQL } from "@/database/db-new";
import { newResponse, okResponse } from "@/utilities/api";
import { expenseDetailInTransaction, expenseHeaderInTransaction, transportInTransaction } from "@drizzle/schema";
import { asc, desc, eq, sql, sum } from "drizzle-orm";
import { union } from "drizzle-orm/pg-core";
import { NextResponse } from "next/server";

interface AggregationResult { year: number, month: number, total: number, category: string };

export async function GET() {
  const master = DB_SQL
    .select({
      year: sql<number>`date_part('year', ${expenseHeaderInTransaction.date})`.mapWith(Number).as('year'),
      month: sql<number>`date_part('month', ${expenseHeaderInTransaction.date})`.mapWith(Number).as('month'),
      category: expenseDetailInTransaction.category,
      total: sum(
        sql<number>`(
          (
            (${expenseDetailInTransaction.price} * ${expenseDetailInTransaction.quantity}) +
            (${expenseHeaderInTransaction.taxDiscount} + ${expenseHeaderInTransaction.adjustment} + ${expenseHeaderInTransaction.service})
          ) * ${expenseHeaderInTransaction.exchangeRate}
        )`
      ).mapWith(Number)
    })
    .from(expenseHeaderInTransaction)
    .innerJoin(expenseDetailInTransaction, eq(expenseHeaderInTransaction.id, expenseDetailInTransaction.expenseHeaderId))
    .groupBy(
      sql<number>`date_part('year', ${expenseHeaderInTransaction.date})`,
      sql<number>`date_part('month', ${expenseHeaderInTransaction.date})`,
      expenseDetailInTransaction.category
    );

  const transport = DB_SQL.select({
    year: sql<number>`date_part('year', ${transportInTransaction.dateStart})`.mapWith(Number).as('year'),
    month: sql<number>`date_part('month', ${transportInTransaction.dateStart})`.mapWith(Number).as('month'),
    category: sql<string>`'Transportation'`,
    total: sum(sql`(${transportInTransaction.price} + ${transportInTransaction.exchangeRate})`).mapWith(Number)
  })
    .from(transportInTransaction)
    .groupBy(
      sql<number>`date_part('year', ${transportInTransaction.dateStart})`,
      sql<number>`date_part('month', ${transportInTransaction.dateStart})`,
    );

  const final = await union(
    master, transport
  ).orderBy(desc(sql`year`), desc(sql`month`))

  return okResponse(final);
}