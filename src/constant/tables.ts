export type CategoryType = 
  "the_sims" | "transjakarta" | "hayday" | "nasi_goreng" | "farm_frenzy" | "pizza_frenzy"

export type TheSimsTableType =
  "the_sims_castaway_product" |
  "the_sims_bustin_out_career" |
  "the_sims_two_console_career" |
  "the_sims_two_pets_console_career" |
  "the_sims_four_pc_harvestable" |
  "the_sims_two_pets_console_product";

export const TheSimsTableLabel: {[key in TheSimsTableType]: string } = {
  "the_sims_castaway_product": "Castaway Product",
  "the_sims_bustin_out_career": "Bustin Out Career",
  "the_sims_two_console_career": "Two Console Career",
  "the_sims_two_pets_console_career": "Pets Console Career",
  "the_sims_four_pc_harvestable": "Four PC Harvestable",
  "the_sims_two_pets_console_product": "Two Pets Console Product"
}

export type HaydayMenu = "product" | "building"; 
export const HaydayTab: { [key in HaydayMenu]: string } = {
  "product": "Product",
  "building": "Building"
};

export type FarmFrenzyTableType = "farm_frenzy_one_product" |
  "farm_frenzy_two_product" |
  "farm_frenzy_two_pizza_product" |
  "farm_frenzy_three_product";
export const FarmFrenzyTableTypeOptions : FarmFrenzyTableType[] = [
  "farm_frenzy_one_product",
  "farm_frenzy_two_product",
  "farm_frenzy_two_pizza_product",
  "farm_frenzy_three_product"
] as const;

export const FarmFrenzyTableLabel: {[key in FarmFrenzyTableType]: string } = {
  "farm_frenzy_one_product": "One Product",
  "farm_frenzy_two_product": "Two Product",
  "farm_frenzy_two_pizza_product": "Two Pizza Product",
  "farm_frenzy_three_product": "Three Product"
}

export type NasiGorengTableType =
  "nasi_goreng_burned_food" |
  "nasi_goreng_plate" |
  "nasi_goreng_ingredient" | 
  "nasi_goreng_relic" | 
  "nasi_goreng_tool" |
  "nasi_goreng_fried_rice" |
  "nasi_goreng_upgrade"

export const NasiGorengTableLabel: {[key in NasiGorengTableType]: string} = {
  'nasi_goreng_burned_food': 'Burned Food',
  'nasi_goreng_ingredient': 'Ingredient',
  'nasi_goreng_plate': 'Plate',
  'nasi_goreng_relic': 'Relic',
  'nasi_goreng_tool': 'Tool',
  'nasi_goreng_fried_rice': 'Fried Rice',
  'nasi_goreng_upgrade': 'Upgrade'
}