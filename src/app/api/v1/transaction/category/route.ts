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
          total: {
            $multiply: [
              {
                $add: [
                  {
                    $reduce: {
                      input: "$details",
                      initialValue: 0,
                      in: {
                        $add: [
                          {
                            $multiply: [
                              "$$this.price",
                              "$$this.quantity"
                            ]
                          },
                          "$$value"
                        ]
                      }
                    }
                  },
                  "$tax_discount"
                ]
              },
              "$exchange_rate"
            ]
          }
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