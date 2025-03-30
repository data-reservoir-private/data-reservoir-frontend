import { TransactionMonthlyResponse } from './../model/response/transaction';
import { MONGODB, ID_AGGR } from "@/database/db";
import { TransactionSummaryResponse } from "@/model/response/transaction";
import 'server-only';

interface MonthlyAggResult { year: number, month: number, total: number };
interface CategoryAggResult { category: string, total: number };

export async function GetSummary() {
  // P1. Summary Report

  // 1. Get Master and Transport
  const master = await MONGODB.transaction.master.aggregate<MonthlyAggResult>(
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
  ).toArray() as MonthlyAggResult[];

  const transport = await MONGODB.transaction.transport.aggregate<MonthlyAggResult>(
    [
      ...ID_AGGR,
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

  // P2. Per Category Division
  const master2 = await MONGODB.transaction.master.aggregate<CategoryAggResult>(
    [
      ...ID_AGGR,
      {
        $unwind: "$details"
      },
      {
        $group: {
          _id: "$details.category",
          total: {
            $sum: {
              $multiply: [
                "$details.quantity",
                "$details.price",
                "$exchange_rate"
              ]
            }
          }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $project: {
          category: '$_id',
          total: '$total',
          _id: false
        }
      }
    ]
  ).toArray() as CategoryAggResult[];

  const transport2 = await MONGODB.transaction.transport.aggregate<CategoryAggResult>(
    [
      {
        $group: {
          _id: "Transportation",
          total: {
            $sum: {
              $multiply: [
                '$price',
                '$exchange_rate'
              ]
            }
          }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $project: {
          category: '$_id',
          total: '$total',
          _id: false
        }
      }
    ]
  ).toArray() as CategoryAggResult[];

  return {
    monthly: result,
    category: [...master2, ...transport2]
  } as TransactionSummaryResponse;
}

export async function GetMonthly(year: number, month: number) {
  const category = await getMonthlyCategory(year, month);
  const income = await getIncome(year, month);
  const totalExpense = category.reduce((acc, curr) => acc + curr.total, 0);
  const totalIncome = income.reduce((acc, curr) => acc + curr.total, 0);
  return {
    expense: {
      topTen: await getTop15Expensive(year, month),
      category: category,
      total: totalExpense,
      percentage: Math.round((totalExpense / (totalExpense + totalIncome)) * 100)
    },
    income: {
      total: totalIncome,
      detail: income,
      percentage: Math.round((totalIncome / (totalExpense + totalIncome)) * 100)
    }
  } as TransactionMonthlyResponse;
}

async function getTop15Expensive(year: number, month: number) {
  const regexFilter = `^${year}-${month.toString().padStart(2, '0')}`;
  const masterStartPipeline = [
    {
      $match: {
        date: {
          $regex: regexFilter
        }
      }
    },
    ...ID_AGGR
  ]
  const transportStartPipeline = [
    {
      $match: {
        date_start: {
          $regex: regexFilter
        }
      }
    },
    ...ID_AGGR
  ]

  const expyMasterPipeline =
    [
      ...masterStartPipeline,
      {
        $addFields: {
          total: {
            $multiply: [
              "$exchange_rate",
              {
                $add: [
                  "$tax_discount",
                  {
                    $reduce: {
                      input: "$details",
                      initialValue: 0,
                      in: {
                        $add: [
                          "$$value",
                          {
                            $multiply: [
                              "$$this.price",
                              "$$this.quantity"
                            ]
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      },
      {
        $sort: {
          total: -1
        }
      },
      {
        $project: {
          tenant: "$tenant",
          date: true,
          details: {
            category: true,
            price: true,
            quantity: true,
            name: true
          },
          total: "$total"
        }
      }
    ];

  const expyTransportPipeline = [
    {
      $match: {
        date_start: {
          $regex: "^2025-03-*"
        }
      }
    },
    ...transportStartPipeline,
    {
      $addFields: {
        total: {
          $multiply: ["$exchange_rate", "$price"]
        }
      }
    },
    {
      $sort: {
        total: -1
      }
    },
    {
      $project: {
        tenant: {
          $concat: ["$company", " - ", "$type"]
        },
        date: true,
        details: [],
        total: "$total"
      }
    }
  ]

  return (await MONGODB.transaction.master.aggregate([
    ...expyMasterPipeline,
    {
      $unionWith: { coll: 'transaction_transport', pipeline: expyTransportPipeline }
    },
    {
      $sort: { total: -1 }
    },
    {
      $limit: 15
    }
  ]).toArray()) as TransactionMonthlyResponse['expense']['topTen']
}

async function getMonthlyCategory(year: number, month: number) {
  const regexFilter = `^${year}-${month.toString().padStart(2, '0')}`;
  const masterStartPipeline = [
    {
      $match: {
        date: {
          $regex: regexFilter
        }
      }
    },
    ...ID_AGGR
  ]
  const transportStartPipeline = [
    {
      $match: {
        date_start: {
          $regex: regexFilter
        }
      }
    },
    ...ID_AGGR
  ]

  const master = await MONGODB.transaction.master.aggregate([
    ...masterStartPipeline,
    {
      $unwind: "$details"
    },
    {
      $addFields: {
        total: {
          $multiply: [
            "$exchange_rate",
            "$details.price",
            "$details.quantity"
          ]
        }
      }
    },
    {
      $group: {
        _id: "$details.category",
        total: {
          $sum: "$total"
        }
      }
    },
    {
      $project:
      {
        name: "$_id",
        total: true,
        _id: false
      }
    }
  ]).toArray() as TransactionMonthlyResponse['expense']['category']

  const transport = await MONGODB.transaction.transport.aggregate([
    ...transportStartPipeline,
    {
      $group:
      {
        _id: "Transportation",
        total: {
          $sum: {
            $multiply: ["$exchange_rate", "$price"]
          }
        }
      }
    },
    {
      $project: {
        name: "Transportation",
        total: true,
        _id: false
      }
    }
  ]).toArray() as TransactionMonthlyResponse['expense']['category']

  return [...master, ...transport].sort((a, b) => b.total - a.total);
}

async function getIncome(year: number, month: number) {
  const regexFilter = `^${year}-${month.toString().padStart(2, '0')}`;
  const incomePipeline = [
    {
      $match: {
        date: {
          $regex: regexFilter
        }
      }
    },
    ...ID_AGGR,
    {
      $project: {
        total: "$income",
        name: {
          $concat: ['$source', ' - ', '$category']
        }
      }
    }
  ];

  return (await MONGODB.transaction.income.aggregate(incomePipeline).toArray()) as TransactionMonthlyResponse['income']['detail'];
}