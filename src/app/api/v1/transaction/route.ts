import { ID_AGGR, MONGODB } from "@/database/db";
import { newResponse } from "@/utilities/api";
import { NextResponse } from "next/server";

interface AggregationResult { year: number, month: number, total: number };

export async function GET() {
  // 1. Get Master and Transport
  const master = await MONGODB.transaction.master.aggregate<AggregationResult>(
    [
      ...ID_AGGR,
      {
        $unset: ['details.id']
      },
      {
        $addFields: {
          newDate: {
            $dateFromString: { dateString: "$date" }
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
            $sum: {
              $add: [
                {
                  $multiply: [
                    {
                      $reduce: {
                        input: "$details",
                        initialValue: 0,
                        in: {
                          $multiply: [
                            "$$this.price",
                            "$$this.quantity"
                          ]
                        }
                      },
                    },
                    "$exchange_rate"
                  ]
                },
                "$tax_discount"
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
          year: "$_id.year",
          month: "$_id.month",
          total: "$total"
        }
      }
    ]
  ).toArray();

  // 2. Generate Master of year and month (default: 3 years);
  const result: { year: number, month: number, total: number }[] = [];
  const currentDate = new Date();
  let [year, month] = [currentDate.getFullYear() - 2, 0];

  
  // 3. Generate report
  while (currentDate.getFullYear() >= year) {
    result.push({
      year: year,
      month: month + 1,
      total: Math.round((master.find(x => x.month === month + 1 && x.year === year)?.total ?? 0) +
      (transport.find(x => x.month === month + 1 && x.year === year)?.total ?? 0))
    });
    if (month + 1 === 12) year++;
    month = ((month + 1) % 12);

    if (currentDate.getFullYear() === year && currentDate.getMonth() < month) break;
  }

  return NextResponse.json(newResponse(result));
}