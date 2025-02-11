import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

interface AggregationResult { year: number, month: number, total: number, category: string };

export async function GET() {
  // 1. Get Master and Transport
  const master = await MONGODB.transaction.master.aggregate<AggregationResult>(
    [
      ...ID_AGGR,
      {
        $unwind: "$details"
      },
      {
        $addFields: {
          year: {
            $year: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          },
          month: {
            $month: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            category: "$details.category"
          },
          total: {
            $sum: {
              $multiply: [
                "$exchange_rate",
                "$details.price",
                "$details.quantity"
              ]
            }
          }
        }
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1
        }
      },
      {
        $project: {
          _id: false,
          category: "$_id.category",
          year: "$_id.year",
          month: "$_id.month",
          total: "$total"
        }
      }
    ]
  ).toArray() as AggregationResult[];

  const transport = await MONGODB.transaction.transport.aggregate<AggregationResult>(
    [
      {
        $addFields: {
          newDate: {
            $dateFromString: { dateString: "$date_start" }
          }
        }
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$newDate"
            },
            month: {
              $month: "$newDate"
            }
          },
          total: {
            $sum: "$price"
          }
        }
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1
        }
      },
      {
        $project: {
          _id: false,
          category: "Transport",
          year: "$_id.year",
          month: "$_id.month",
          total: "$total"
        }
      }
    ]
  ).toArray() as AggregationResult[];

  const result = [...master, ...transport];
  return NextResponse.json(newResponse(result));
}