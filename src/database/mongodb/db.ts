import { MongoClient } from 'mongodb';
import { FarmFrenzyOneProductSchema, FarmFrenzyThreeProductSchema, FarmFrenzyTwoPizzaProductSchema, FarmFrenzyTwoProductSchema } from './schema/farm-frenzy';
import { HaydayBuildingSchema, HaydayProductSchema } from './schema/hayday';

const client = new MongoClient(process.env.DATABASE_URL)
const db = client.db('apify')
export const MONGODB = {
  client: client,

  farm_frenzy: {
    one_product: db.collection<FarmFrenzyOneProductSchema>('farm_frenzy_1_product'),
    two_product: db.collection<FarmFrenzyTwoProductSchema>('farm_frenzy_2_product'),
    two_pizza_product: db.collection<FarmFrenzyTwoPizzaProductSchema>('farm_frenzy_2_pizza_product'),
    three_product: db.collection<FarmFrenzyThreeProductSchema>('farm_frenzy_3_product')
  },

  hayday: {
    product: db.collection<HaydayProductSchema>('hayday_product'),
    building: db.collection<HaydayBuildingSchema>('hayday_building')
  }
  
} as const

export const ID_AGGR = [{ $replaceRoot: { newRoot: { $mergeObjects: [ { id: '$_id' }, '$$ROOT' ]} } }, { $unset: ['_id'] }];
export const PAGINATION_AGGR = ({ currentPage, pageSize } : { currentPage: number, pageSize: number }) => [
  { $skip: pageSize * (currentPage - 1) },
  { $limit: pageSize }
]