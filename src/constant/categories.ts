import { THE_SIMS_RARITY } from "./enums";

export const CATEGORIES = Object.freeze({
  'hayday-product': [
    "Animals",
    "Bushes",
    "Crops",
    "Ores",
    "Processed",
    "Supplies",
    "Trees"
  ],
  'the-sims-castaway-product': [
    "Fruits",
    "Large Fishes",
    "Small Fishes",
    "Medium Fishes",
    "Spices",
    "Veggies, Nuts, and Grains",
    "Resources",
    "Meats",
  ],
  'the-sims-two-pets-console-product': [
    "Dairies",
    "Harvested Animals",
    "Meats",
    "Liquids",
    "Harvested Fruits",
    "Oils",
    "Fruits",
    "Harvested Vegetables",
    "Grains",
    "Vegetables",
  ],
  'the-sims-rarity': [
    { label: "No Rarity", value: THE_SIMS_RARITY.NO_RARITY },
    { label: "Common", value: THE_SIMS_RARITY.COMMON },
    { label: "Uncommon", value: THE_SIMS_RARITY.UNCOMMON },
    { label: "Rare", value: THE_SIMS_RARITY.RARE },
  ] as { label: string, value: THE_SIMS_RARITY }[],
  'the-sims-four-pc-harvestable': [
    "Other",
    "Plant",
    "Shrub",
    "Tree",
    "Flowers",
    "Bush",
    "Patch",
  ],
  'the-sims-three-pc-dish-type': [
    "Toy Oven",
    "Standard",
    "Pet",
    "Store",
  ],
  'nasi-goreng-ingredient': [
    "Seasoning / Bumbu",
    "Other / Lainnya",
    "Stir Fry / Tumisan",
    "Meat / Daging"
  ],
  'cygnus-mineral': [
    'Foraged Minerals',
    'Geode Minerals',
    'Gems',
    'Ores',
    'Geodes',
    'Bars',
  ],
  'the-sims-four-pc-dish-type': [
    'Gourmet Pet',
    'Pit',
    'Cupcake',
    'Grand',
    'Off The Grid',
    'Gourmet',
    'Pet',
    'Waffle',
    'Food Stall',
    'Standard',
    'Pizza',
    'Outdoor Grill',
  ],
  'three-pc-harvestable-plant-type': [
    'Bush',
    'Dirt Mound',
    'Crystal Plant',
    'Tree',
    'Vine'
  ]
})