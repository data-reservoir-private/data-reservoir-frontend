import { Route } from "next";

export interface IBreadcrumb {
  label: string,
  link?: Route
}

export const BREADCRUMBS = Object.freeze({
  'hayday-product': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Product" }
  ] satisfies IBreadcrumb[],
  'hayday-product-detail': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Product", link: '/hayday/product' }
  ] satisfies IBreadcrumb[],
  'hayday-building': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday building" }
  ] satisfies IBreadcrumb[],
  'hayday-building-detail': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Building", link: '/hayday/building' }
  ] satisfies IBreadcrumb[],
  'hayday-order': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Order" }
  ] satisfies IBreadcrumb[],

  // Hayday
  'the-sims-castaway-product': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Castaway Product" }
  ] satisfies IBreadcrumb[],
  'the-sims-castaway-product-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Castaway Product", link: '/the-sims/castaway-product' }
  ] satisfies IBreadcrumb[],
  'the-sims-two-pets-console-product': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Product" }
  ] satisfies IBreadcrumb[],
  'the-sims-two-pets-console-product-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Product", link: '/the-sims/two-pets-console-product' }
  ] satisfies IBreadcrumb[],
  'the-sims-two-pets-console-career': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Career" }
  ] satisfies IBreadcrumb[],
  'the-sims-two-pets-console-career-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Career", link: '/the-sims/two-pets-console-career' }
  ] satisfies IBreadcrumb[],
  'the-sims-two-console-career': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Console Career" }
  ] satisfies IBreadcrumb[],
  'the-sims-two-console-career-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Console Career", link: '/the-sims/two-console-career' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-harvestable': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Harvestable" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-harvestable-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Harvestable", link: '/the-sims/four-pc-harvestable' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-harvestable': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Harvestable" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-harvestable-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Harvestable", link: '/the-sims/three-pc-harvestable' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-gem-cut': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Gem Cut" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-gem-cut-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Gem Cut", link: '/the-sims/three-pc-gem-cut' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-gem': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Gem" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-gem-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Gem", link: '/the-sims/three-pc-gem' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-raw-gem': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Raw Gem" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-raw-gem-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Raw Gem", link: '/the-sims/three-pc-raw-gem' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-metal': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Metal" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-metal-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Metal", link: '/the-sims/three-pc-metal' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-spread-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Spread Dish" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-spread-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Spread Dish", link: '/the-sims/three-pc-spread-dish' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-preserve-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Preserve Dish" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-preserve-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Preserve Dish", link: '/the-sims/three-pc-preserve-dish' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-metal': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Metal" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-metal-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Metal", link: '/the-sims/four-pc-metal' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-element': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Element" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-element-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Element", link: '/the-sims/four-pc-element' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-crystal': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Crystal" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-crystal-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Crystal", link: '/the-sims/four-pc-crystal' }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Dish" }
  ] satisfies IBreadcrumb[],
  'the-sims-three-pc-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Dish", link: '/the-sims/three-pc-dish' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Dish" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Dish", link: '/the-sims/four-pc-dish' }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-canned-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Canned Dish" }
  ] satisfies IBreadcrumb[],
  'the-sims-four-pc-canned-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Canned Dish", link: '/the-sims/four-pc-canned-dish' }
  ] satisfies IBreadcrumb[],
  'the-sims-bustin-out-career': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Bustin Out Career" }
  ] satisfies IBreadcrumb[],
  'the-sims-bustin-out-career-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Bustin Out Career", link: '/the-sims/bustin-out-career' }
  ] satisfies IBreadcrumb[],

  // Farm Frenzy
  'farm-frenzy-one-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy One Product", }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-one-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy One Product", link: '/farm-frenzy/one-product' }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-two-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Product", }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-two-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Product", link: '/farm-frenzy/two-product' }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-three-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Three Product", }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-three-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Three Product", link: '/farm-frenzy/three-product' }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-two-pizza-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Pizza Product", }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-two-pizza-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Pizza", link: '/farm-frenzy/two-pizza-product' }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-hurricane-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Hurricane Seasons Product", }
  ] satisfies IBreadcrumb[],
  'farm-frenzy-hurricane-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Hurricane Seasons", link: '/farm-frenzy/hurricane-product' }
  ] satisfies IBreadcrumb[],

  // Pizza Frenzy
  'pizza-frenzy-topping': [
    { label: "Pizza Frenzy", link: '/pizza-frenzy' },
    { label: "Pizza Frenzy Topping", }
  ] satisfies IBreadcrumb[],
  'pizza-frenzy-topping-detail': [
    { label: "Pizza Frenzy", link: '/pizza-frenzy' },
    { label: "Pizza Frenzy Topping", link: '/pizza-frenzy/topping' }
  ] satisfies IBreadcrumb[],

  // Nasi Goreng
  'nasi-goreng-ingredient': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Ingredient", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-ingredient-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Ingredient", link: '/nasi-goreng/ingredient' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-fried-rice': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Fried Rice", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-fried-rice-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Fried Rice", link: '/nasi-goreng/fried-rice' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-upgrade': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Upgrade", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-upgrade-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Upgrade", link: '/nasi-goreng/upgrade' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-tool': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Tool", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-tool-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Tool", link: '/nasi-goreng/tool' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-relic': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Relic", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-relic-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Relic", link: '/nasi-goreng/relic' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-burned-food': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Burned Food", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-burned-food-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Burned Food", link: '/nasi-goreng/burned-food' }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-plate': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Plate", }
  ] satisfies IBreadcrumb[],
  'nasi-goreng-plate-detail': [
    { label: "Nasi Goreng", link: '/nasi-goreng' },
    { label: "Nasi Goreng Plate", link: '/nasi-goreng/plate' }
  ] satisfies IBreadcrumb[],

  // Seasons
  'seasons-ds-mineral-shippable': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Shippable", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-shippable-detail': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Shippable", link: '/seasons/ds-mineral-shippable' },
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-crop': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Crop", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-crop-detail': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Crop", link: '/seasons/ds-mineral-crop' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-recipe': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Recipe", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-recipe-detail': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Recipe", link: '/seasons/ds-mineral-recipe' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-utensil': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Utensil", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-mineral-utensil-detail': [
    { label: "Seasons DS Mineral", link: '/seasons' },
    { label: "Seasons DS Mineral Utensil", link: '/seasons/ds-mineral-utensil' }
  ] satisfies IBreadcrumb[],

  'seasons-ds-bazaar-crop': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Crop", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-crop-detail': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Crop", link: '/seasons/ds-bazaar-crop' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-recipe': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Recipe", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-recipe-detail': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Recipe", link: '/seasons/ds-bazaar-recipe' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-windmill-product': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Windmill Product", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-windmill-product-detail': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Windmill Product", link: '/seasons/ds-bazaar-windmill-product' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-animal-product': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Animal Product", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-animal-product-detail': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Animal Product", link: '/seasons/ds-bazaar-animal-product' }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-wild-product': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Wild Product", }
  ] satisfies IBreadcrumb[],
  'seasons-ds-bazaar-wild-product-detail': [
    { label: "Seasons DS Bazaar", link: '/seasons' },
    { label: "Seasons DS Bazaar Wild Product", link: '/seasons/ds-bazaar-wild-product' }
  ] satisfies IBreadcrumb[],

  // Cygnus
  'cygnus-mineral': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Mineral", }
  ] satisfies IBreadcrumb[],
  'cygnus-mineral-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Mineral", link: '/cygnus/mineral' }
  ] satisfies IBreadcrumb[],
  'cygnus-dish': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Dish", }
  ] satisfies IBreadcrumb[],
  'cygnus-dish-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Dish", link: '/cygnus/dish' }
  ] satisfies IBreadcrumb[],
  'cygnus-artifact': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Artifact", }
  ] satisfies IBreadcrumb[],
  'cygnus-artifact-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Artifact", link: '/cygnus/artifact' }
  ] satisfies IBreadcrumb[],
  'cygnus-node': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Node", }
  ] satisfies IBreadcrumb[],
  'cygnus-node-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Node", link: '/cygnus/node' }
  ] satisfies IBreadcrumb[],
  'cygnus-forage': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Forage", }
  ] satisfies IBreadcrumb[],
  'cygnus-forage-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Forage", link: '/cygnus/forage' }
  ] satisfies IBreadcrumb[],
  'cygnus-crop': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Crop", }
  ] satisfies IBreadcrumb[],
  'cygnus-crop-detail': [
    { label: "Cygnus", link: '/cygnus' },
    { label: "Cygnus Crop", link: '/cygnus/crop' }
  ] satisfies IBreadcrumb[],

  'transaction-monthly': [
    { label: "Transaction", link: '/transaction' },
    { label: "Monthly" }
  ] satisfies IBreadcrumb[],
});