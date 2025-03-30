import { API_SHORTHAND } from "@/constant/api-route";
import { ID_AGGR, MONGODB } from "@/database/db";
import { TheSimsBustinOutCareerResponse, TheSimsCastawayProductResponse, TheSimsFourPCHarvestableResponse, TheSimsTwoConsoleCareerResponse, TheSimsTwoPetsConsoleCareerResponse, TheSimsTwoPetsConsoleProductResponse } from "@/model/response/the-sims";
import 'server-only'

type RouteEndpoint = typeof API_SHORTHAND.THE_SIMS[keyof typeof API_SHORTHAND.THE_SIMS]

export async function GetTheSimsData(category: RouteEndpoint) {
  switch (category as RouteEndpoint) {
    case 'castaway-product':
      return await MONGODB.the_sims.castaway_product.aggregate(ID_AGGR).toArray() as TheSimsCastawayProductResponse[];
    case 'four-pc-harvestable':
      return await MONGODB.the_sims.four_pc_harvestable.aggregate(ID_AGGR).toArray() as TheSimsFourPCHarvestableResponse[];
    case 'two-pets-console-product':
      return await MONGODB.the_sims.two_pets_console_product.aggregate(ID_AGGR).toArray() as TheSimsTwoPetsConsoleProductResponse[];
    case 'bustin-out-career':
      return await MONGODB.the_sims.the_sims_bustin_out_career.aggregate(ID_AGGR).toArray() as TheSimsBustinOutCareerResponse[];
    case 'two-console-career':
      return await MONGODB.the_sims.two_console_career.aggregate(ID_AGGR).toArray() as TheSimsTwoConsoleCareerResponse[];
    case 'two-pets-console-career':
      return await MONGODB.the_sims.two_pets_console_career.aggregate(ID_AGGR).toArray() as TheSimsTwoPetsConsoleCareerResponse[];
  }
}

export async function GetTheSimsDataByID(category: RouteEndpoint, id: string) {
  const aggr = [...ID_AGGR, {
    $match: { id: id }
  }];

  switch (category as RouteEndpoint) {
    case 'castaway-product':
      return (await MONGODB.the_sims.castaway_product.aggregate(aggr).limit(1).toArray())[0];
    case 'four-pc-harvestable':
      return (await MONGODB.the_sims.four_pc_harvestable.aggregate(aggr).limit(1).toArray())[0];
    case 'two-pets-console-product':
      return (await MONGODB.the_sims.two_pets_console_product.aggregate(aggr).limit(1).toArray())[0];
    case 'bustin-out-career':
      return (await MONGODB.the_sims.the_sims_bustin_out_career.aggregate(aggr).limit(1).toArray())[0];
    case 'two-console-career':
      return (await MONGODB.the_sims.two_console_career.aggregate(aggr).limit(1).toArray())[0];
    case 'two-pets-console-career':
      return (await MONGODB.the_sims.two_pets_console_career.aggregate(aggr).limit(1).toArray())[0];
  }
}