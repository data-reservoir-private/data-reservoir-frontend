import { MongoClient } from 'mongodb';
import { FarmFrenzyOneProductSchema, FarmFrenzyThreeProductSchema, FarmFrenzyTwoPizzaProductSchema, FarmFrenzyTwoProductSchema } from './schema/farm-frenzy';
import { HaydayBuildingSchema, HaydayProductSchema } from './schema/hayday';
import { PizzaFrenzyToppingSchema } from './schema/pizza-frenzy';
import { TheSimsBustinOutCareerSchema, TheSimsCastawayProductSchema, TheSimsFourPCHarvestableSchema, TheSimsTwoConsoleCareerSchema, TheSimsTwoPetsConsoleCareerSchema, TheSimsTwoPetsConsoleProductSchema } from './schema/the-sims';
import { NasiGorengBurnedFoodSchema, NasiGorengFriedRiceSchema, NasiGorengIngredientSchema, NasiGorengPlateSchema, NasiGorengRelicSchema, NasiGorengToolSchema, NasiGorengUpgradeSchema } from './schema/nasi-goreng';
import { CygnusArtifactSchema, CygnusCropSchema, CygnusDishSchema, CygnusMineralSchema, CygnusNodeSchema } from './schema/cygnus';
import { QuartzShippableSchema, QuartzUtensilSchema, QuartzRecipeSchema } from './schema/quartz';
import { MasterCollectionCategorySchema } from './schema/master';
import { TransjakartaCorridorSchema, TransjakartBusStopSchema } from './schema/transjakarta';
import { TransactionIncomeSchema, TransactionMasterSchema, TransactionTransportSchema } from './schema/transaction';

const client = new MongoClient(process.env.DATABASE_URL, {
  maxConnecting: 2,
  timeoutMS: 60000,
  serverSelectionTimeoutMS: 60000
});
const db = client.db(process.env.DATABASE_NAME);
export const MONGODB = {
  client: client,
  db: db,

  farm_frenzy: {
    one_product: db.collection<FarmFrenzyOneProductSchema>('farm_frenzy_1_product'),
    two_product: db.collection<FarmFrenzyTwoProductSchema>('farm_frenzy_2_product'),
    two_pizza_product: db.collection<FarmFrenzyTwoPizzaProductSchema>('farm_frenzy_2_pizza_product'),
    three_product: db.collection<FarmFrenzyThreeProductSchema>('farm_frenzy_3_product')
  },

  hayday: {
    product: db.collection<HaydayProductSchema>('hayday_product'),
    building: db.collection<HaydayBuildingSchema>('hayday_building')
  },

  pizza_frenzy: {
    topping: db.collection<PizzaFrenzyToppingSchema>('pizza_frenzy_topping')
  },

  the_sims: {
    four_pc_harvestable: db.collection<TheSimsFourPCHarvestableSchema>('the_sims_four_pc_harvestable'),
    castaway_product: db.collection<TheSimsCastawayProductSchema>('the_sims_castaway_product'),
    two_pets_console_product: db.collection<TheSimsTwoPetsConsoleProductSchema>('the_sims_two_pets_console_product'),
    the_sims_bustin_out_career: db.collection<TheSimsBustinOutCareerSchema>('the_sims_bustin_out_career'),
    two_pets_console_career: db.collection<TheSimsTwoPetsConsoleCareerSchema>('the_sims_two_pets_console_career'),
    two_console_career: db.collection<TheSimsTwoConsoleCareerSchema>('the_sims_two_console_career'),
  },

  nasi_goreng: {
    burned_food: db.collection<NasiGorengBurnedFoodSchema>('nasi_goreng_burned_food'),
    relic: db.collection<NasiGorengRelicSchema>('nasi_goreng_relic'),
    plate: db.collection<NasiGorengPlateSchema>('nasi_goreng_plate'),
    upgrade: db.collection<NasiGorengUpgradeSchema>('nasi_goreng_upgrade'),
    tool: db.collection<NasiGorengToolSchema>('nasi_goreng_tool'),
    ingredient: db.collection<NasiGorengIngredientSchema>('nasi_goreng_ingredient'),
    fried_rice: db.collection<NasiGorengFriedRiceSchema>('nasi_goreng_fried_rice'),
  },

  quartz: {
    shippable: db.collection<QuartzShippableSchema>('quartz_shippable'),
    utensil: db.collection<QuartzUtensilSchema>('quartz_utensil'),
    recipe: db.collection<QuartzRecipeSchema>('quartz_recipe'),
  },

  cygnus: {
    mineral: db.collection<CygnusMineralSchema>('cygnus_mineral'),
    artifact: db.collection<CygnusArtifactSchema>('cygnus_artifact'),
    dish: db.collection<CygnusDishSchema>('cygnus_dish'),
    crop: db.collection<CygnusCropSchema>('cygnus_crop'),
    node: db.collection<CygnusNodeSchema>('cygnus_node'),
  },

  transjakarta: {
    bus_stop: db.collection<TransjakartBusStopSchema>('transjakarta_bus_stop'),
    corridor: db.collection<TransjakartaCorridorSchema>('transjakarta_corridor'),
  },

  transaction: {
    master: db.collection<TransactionMasterSchema>('transaction_master'),
    transport: db.collection<TransactionTransportSchema>('transaction_transport'),
    income: db.collection<TransactionIncomeSchema>('transaction_income'),
  },

  master: {
    collection_category: db.collection<MasterCollectionCategorySchema>('master_collection_category')
  }
} as const;

export const ID_AGGR = [
  { $replaceRoot: { newRoot: { $mergeObjects: [{ id: { $convert: {input: '$_id', format: 'uuid', to: { subtype: 4, type: 2 }}} }, '$$ROOT'] } } },
  { $unset: ['_id'] }
];
export const PAGINATION_AGGR = ({ currentPage, pageSize }: { currentPage: number, pageSize: number }) => [
  { $skip: pageSize * (currentPage - 1) },
  { $limit: pageSize }
];