import { ID_AGGR, MONGODB } from "@/database/db";
import { TransactionMonthlySchema } from "@/model/request/transaction";
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
    const master = await MONGODB.transaction.master.aggregate(
      [
        ...ID_AGGR,
        {
          $match: {
            date: {
              $regex: `${data.year}-${data.month.toString().padStart(2, '0')}-*`
            }
          }
        },
        {
          $set: {
            details: {
              $sortArray: {
                input: '$details',
                sortBy: {
                  price: -1
                }
              }
            }
          }
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
            },
            categories: {
              $reduce: {
                input: "$details",
                initialValue: [],
                in: {
                  $concatArrays: [
                    {
                      $cond: {
                        if: { $in: [ '$$this.category', '$$value' ] },
                        then: [],
                        else: ['$$this.category']
                      }
                    },
                    '$$value'
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            date: true,
            tenant: true,
            categories: true,
            details: {
              category: true,
              order: true,
              quantity: true,
              price: true
            },
            total: true
          }
        }
      ]
    ).toArray() as MonthlyResult[];

    return NextResponse.json(newResponse(master));
  }
  catch (e) {
    if (e instanceof ValidationError) return badRequestResponse(e.errors[0]);
    else return internalErrorResponse();
  }

}