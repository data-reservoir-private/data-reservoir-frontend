import { HAYDAY_EVENT, HAYDAY_ORDER_STATUS, HAYDAY_VOUCHER } from "@/constant/enums";
import { MONGODB, ID_AGGR } from "@/database/db";
import { HaydayTruckOrderSchema } from "@/database/schema/hayday";
import { HayDayOrderSummaryResponse, HayDayProductResponse } from "@/model/response/hayday";
import { MongoDBHelper } from "@/utilities/api";

export async function GetHaydayProduct(limit: number) {
  return await MONGODB.hayday.product.aggregate(
    MongoDBHelper.createPipeline(
      ID_AGGR,
      MongoDBHelper.unset(
        'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
        'producer.building_id', 'producer.product_id', 'producer.id',
        'usage.product_id', 'usage.id'
      ),
      { $sort: { level: 1 } },
      limit === 0 ? undefined : { $limit: limit }
    )
  ).toArray() as HayDayProductResponse[];
}

export async function GetHaydayProductByID(id: string) {
  return (await MONGODB.hayday.product.aggregate([...ID_AGGR,
  {
    $unset: [
      'ingredients.ingredient_id', 'ingredients.product_id', 'ingredients.id',
      'producer.building_id', 'producer.product_id', 'producer.id',
      'usage.product_id', 'usage.id'
    ]
  },
  { $match: { id: id } }
  ]).toArray()).find(_ => true) as HayDayProductResponse
}

export async function GetHaydayOrderSummary(data?: { year: number, month: number }) {
  const raw = (await MONGODB.hayday.truck_order.aggregate(MongoDBHelper.createPipeline(
    ID_AGGR,
    MongoDBHelper.unset('orders.id'),
    data ? {
      $match: {
        date_completed: {
          $regex: `^${data.year}-${data.month.toString().padStart(2, '0')}`
        }
      }
    } : undefined
  )).toArray()) as (Omit<HaydayTruckOrderSchema, '_id'>)[]

  const completed = raw.filter(x => x.order_status === HAYDAY_ORDER_STATUS.ACCEPTED).map(x => {
    if (x.event === HAYDAY_EVENT.DOUBLE_COIN) x.coin *= 2;
    else if (x.event === HAYDAY_EVENT.DOUBLE_XP) x.xp *= 2; 
    else if (x.event === HAYDAY_EVENT.TRIPLE_XP) x.xp *= 3; 
    else if (x.event === HAYDAY_EVENT.REVENUE_AD) { x.coin *= 2; x.xp *= 2 }
    else if (x.event === HAYDAY_EVENT.DOUBLE_COIN_REVENUE_AD) { x.coin *= 4; x.xp *= 2 }
    else if (x.event === HAYDAY_EVENT.DOUBLE_XP_REVENUE_AD) { x.coin *= 2; x.xp *= 4 }

    return x;
  });
  const totalReject = raw.filter(x => x.order_status === HAYDAY_ORDER_STATUS.REJECTED).length
  
  const result: HayDayOrderSummaryResponse = {
    income: {
      non_event: {
        coin: 0,
        xp: 0
      },
      event: {
        coin: 0,
        xp: 0
      }
    },
    revenue: {
      event: [],
      non_event: [],
      combined: raw.filter(x => x.order_status === HAYDAY_ORDER_STATUS.REJECTED)
        .map(x => x.coin + x.xp)
    },
    clients: [],
    objects: [],
    ratio: {
      accept: completed.length,
      reject: totalReject,
      ongoing: raw.length - (totalReject + completed.length)
    },
    voucher: {
      blue: 0,
      gold: 0,
      green: 0,
      purple: 0
    }
  };

  completed.forEach(order => {
    result.income.non_event.coin += order.coin;
    result.income.non_event.xp += order.xp;
    
    result.revenue.non_event.push(order.coin + order.xp);
    result.revenue.combined.push(order.coin + order.xp);

    if (order.event === HAYDAY_EVENT.DOUBLE_COIN) order.coin *= 2;
    else if (order.event === HAYDAY_EVENT.DOUBLE_XP) order.xp *= 2; 
    else if (order.event === HAYDAY_EVENT.TRIPLE_XP) order.xp *= 3; 
    else if (order.event === HAYDAY_EVENT.REVENUE_AD) { order.coin *= 2; order.xp *= 2 }
    else if (order.event === HAYDAY_EVENT.DOUBLE_COIN_REVENUE_AD) { order.coin *= 4; order.xp *= 2 }
    else if (order.event === HAYDAY_EVENT.DOUBLE_XP_REVENUE_AD) { order.coin *= 2; order.xp *= 4 }
    
    result.income.event.coin += order.coin;
    result.income.event.xp += order.xp;

    result.revenue.event.push(order.coin + order.xp);

    switch (order.voucher) {
      case HAYDAY_VOUCHER.GOLD:
        result.voucher.gold++;
        break;
      case HAYDAY_VOUCHER.BLUE:
        result.voucher.blue++;
        break;
      case HAYDAY_VOUCHER.GREEN:
        result.voucher.green++;
        break;
      case HAYDAY_VOUCHER.PURPLE:
        result.voucher.purple++;
        break;
      default:
        break;
    }

    const exClient = result.clients.find(x => x.name === order.client_name);
    if (!exClient) result.clients.push({
      income: {
        coin: order.coin,
        xp: order.xp
      },
      count: 1,
      name: order.client_name,
      total: order.coin + order.xp
    });
    else {
      exClient.income.coin += order.coin;
      exClient.income.xp += order.xp;
      exClient.count++;
      exClient.total += order.coin + order.xp;
    }

    order.orders.forEach(product => {
      const exObj = result.objects.find(x => x.id === product.product_id.toString());
      if (!exObj) result.objects.push({
        id: product.product_id.toString(),
        image: product.product_image,
        name: product.product_name,
        quantity: product.quantity
      });
      else exObj.quantity += product.quantity
    });
  });

  result.clients = result.clients.sort((a, b) => a.total - b.total);

  return result;
}