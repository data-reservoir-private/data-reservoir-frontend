import { HAYDAY_EVENT, HAYDAY_ORDER_STATUS, HAYDAY_VOUCHER } from "@/constant/enums";
import { DB_SQL } from "@/database/db-new";
import { HayDayOrderSummaryResponse } from "@/model/response/hayday";
import { GETMethodRoute, newResponse } from "@/utilities/api";
import { truckOrderHeaderInHayday } from "@drizzle/schema";
import { and, count, eq, ne, sql, sum } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const schema = z.object({
  year: z.coerce.number().gte(2010).lte(new Date().getFullYear()).optional(),
  month: z.coerce.number().gte(1).lte(12).optional()
})

export const GET = GETMethodRoute(schema, async (_, { year, month }) => {
  const summary = await getSummary(year, month);
  const detail = (await getDetail())[0];

  const [sumCoin, sumXP, sumEventCoin, sumEventXP, sumAcc, sumRej, sumVGreen, sumVBlue, sumVPurple, sumVGold] = [
    summary.reduce((acc, curr) => acc + curr.coin, 0),
    summary.reduce((acc, curr) => acc + curr.xp, 0),
    summary.reduce((acc, curr) => acc + curr.coin_event, 0),
    summary.reduce((acc, curr) => acc + curr.xp_event, 0),
    summary.reduce((acc, curr) => acc + curr.count_accept, 0),
    summary.reduce((acc, curr) => acc + curr.count_reject, 0),
    summary.reduce((acc, curr) => acc + curr.green_voucher, 0),
    summary.reduce((acc, curr) => acc + curr.blue_voucher, 0),
    summary.reduce((acc, curr) => acc + curr.purple_voucher, 0),
    summary.reduce((acc, curr) => acc + curr.gold_voucher, 0),
  ];

  const returns: HayDayOrderSummaryResponse = {
    income: {
      event: { coin: sumEventCoin, xp: sumEventXP },
      non_event: { coin: sumCoin, xp: sumXP },
    },
    clients: summary.map(s => ({
      name: s.client_name,
      total: s.coin + s.xp,
      count: s.count,
      income: { coin: s.coin, xp: s.xp },
    })),
    ratio: {
      accept: sumAcc,
      reject: sumRej,
      ongoing: 0
    },
    voucher: {
      green: sumVGreen,
      blue: sumVBlue,
      purple: sumVPurple,
      gold: sumVGold,
    },
    revenue: {
      event: detail.revenue_event,
      non_event: detail.revenue,
      combined: []
    },
    objects: []
  }

  return NextResponse.json(newResponse(returns));
});

async function getSummary(year?: number, month?: number) {
  const noFilter = !year || !month;
  const sq1 = DB_SQL.select({
    voucher: truckOrderHeaderInHayday.voucher,
    xp: truckOrderHeaderInHayday.xp,
    coin: truckOrderHeaderInHayday.coin,
    client_name: truckOrderHeaderInHayday.clientName,
    order_status: truckOrderHeaderInHayday.orderStatus,
    coin_event: sql<number>`
      CASE
        WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_COIN} THEN ${truckOrderHeaderInHayday.coin} * 2
        WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_COIN} AND ${truckOrderHeaderInHayday.revenueAd} THEN ${truckOrderHeaderInHayday.coin} * 2
        ELSE ${truckOrderHeaderInHayday.coin}
      END
    `.as('coin_event'),
    xp_event: sql<number>`
      (
				CASE
					WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_XP} THEN ${truckOrderHeaderInHayday.xp} * 2
					WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.TRIPLE_XP} THEN ${truckOrderHeaderInHayday.xp} * 3
					ELSE ${truckOrderHeaderInHayday.xp}
				END
			) * (
				CASE
					WHEN ${truckOrderHeaderInHayday.revenueAd} THEN 2
					ELSE 1
				END
			)
    `.as('xp_event'),
  }).from(truckOrderHeaderInHayday)
    .where(
      and(
        ne(truckOrderHeaderInHayday.orderStatus, HAYDAY_ORDER_STATUS.ONGOING),
        ...(noFilter ? [] : [
          eq(sql<number>`DATE_PART('year', ${truckOrderHeaderInHayday.dateCompleted})`, year),
          eq(sql<number>`DATE_PART('month', ${truckOrderHeaderInHayday.dateCompleted})`, month)
        ])
      )
    )
    .as('sq1');

  return await DB_SQL.select({
    client_name: sq1.client_name,
    coin: sum(sq1.coin).mapWith(Number),
    xp: sum(sq1.xp).mapWith(Number),
    coin_event: sum(sq1.coin_event).mapWith(Number),
    xp_event: sum(sq1.xp_event).mapWith(Number),
    count: count(sq1.client_name).mapWith(Number),
    count_accept: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.order_status} = ${HAYDAY_ORDER_STATUS.ACCEPTED})`.mapWith(Number),
    count_reject: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.order_status} = ${HAYDAY_ORDER_STATUS.REJECTED})`.mapWith(Number),
    green_voucher: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.voucher} = ${HAYDAY_VOUCHER.GREEN})`.mapWith(Number),
    blue_voucher: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.voucher} = ${HAYDAY_VOUCHER.BLUE})`.mapWith(Number),
    purple_voucher: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.voucher} = ${HAYDAY_VOUCHER.PURPLE})`.mapWith(Number),
    gold_voucher: sql<number>`COUNT(${sq1.client_name}) FILTER(WHERE ${sq1.voucher} = ${HAYDAY_VOUCHER.GOLD})`.mapWith(Number),
  }).from(sq1)
    .groupBy(sq1.client_name);
}

async function getDetail() {
  const sq1 = DB_SQL.select({
    xp: truckOrderHeaderInHayday.xp,
    coin: truckOrderHeaderInHayday.coin,
    coin_event: sql<number>`
      CASE
        WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_COIN} THEN ${truckOrderHeaderInHayday.coin} * 2
        WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_COIN} AND ${truckOrderHeaderInHayday.revenueAd} THEN ${truckOrderHeaderInHayday.coin} * 2
        ELSE ${truckOrderHeaderInHayday.coin}
      END
    `.as('coin_event'),
    xp_event: sql<number>`
      (
				CASE
					WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.DOUBLE_XP} THEN ${truckOrderHeaderInHayday.xp} * 2
					WHEN ${truckOrderHeaderInHayday.event} = ${HAYDAY_EVENT.TRIPLE_XP} THEN ${truckOrderHeaderInHayday.xp} * 3
					ELSE ${truckOrderHeaderInHayday.xp}
				END
			) * (
				CASE
					WHEN ${truckOrderHeaderInHayday.revenueAd} THEN 2
					ELSE 1
				END
			)
    `.as('xp_event'),
  }).from(truckOrderHeaderInHayday)
    .where(eq(truckOrderHeaderInHayday.orderStatus, HAYDAY_ORDER_STATUS.ACCEPTED))
    .as('sq1');

  return await DB_SQL.select({
    revenue: sql<number[]>`ARRAY_AGG(${sq1.coin} + ${sq1.xp})`,
    revenue_event: sql<number[]>`ARRAY_AGG(${sq1.coin_event} + ${sq1.xp_event})`,
  }).from(sq1).limit(1);
}