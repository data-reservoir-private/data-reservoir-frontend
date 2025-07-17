export interface IBreadcrumb {
  label: string,
  link?: string
}

export const BREADCRUMBS = Object.freeze({
  'hayday-product': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Product" }
  ],
  'hayday-product-detail': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Product", link: '/hayday/product' }
  ],
  'hayday-building': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday building" }
  ],
  'hayday-building-detail': [
    { label: "Hayday", link: '/hayday' },
    { label: "Hayday Building", link: '/hayday/building' }
  ],

  // Hayday
  'the-sims-castaway-product': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Castaway Product" }
  ],
  'the-sims-castaway-product-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Castaway Product", link: '/the-sims/castaway-product' }
  ],
  'the-sims-two-pets-console-product': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Product" }
  ],
  'the-sims-two-pets-console-product-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Two Pets Console Product", link: '/the-sims/two-pets-console-product' }
  ],
  'the-sims-four-pc-harvestable': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Harvestable" }
  ],
  'the-sims-four-pc-harvestable-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Harvestable", link: '/the-sims/four-pc-harvestable' }
  ],
  'the-sims-four-pc-metal': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Metal" }
  ],
  'the-sims-four-pc-metal-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Metal", link: '/the-sims/four-pc-metal' }
  ],
  'the-sims-four-pc-element': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Element" }
  ],
  'the-sims-four-pc-element-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Element", link: '/the-sims/four-pc-element' }
  ],
  'the-sims-four-pc-crystal': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Crystal" }
  ],
  'the-sims-four-pc-crystal-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Four PC Crystal", link: '/the-sims/four-pc-crystal' }
  ],
  'the-sims-three-pc-dish': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Dish" }
  ],
  'the-sims-three-pc-dish-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Three PC Dish", link: '/the-sims/three-pc-dish' }
  ],
  'the-sims-bustin-out-career': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Bustin Out Career" }
  ],
  'the-sims-bustin-out-career-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Bustin Out Career", link: '/the-sims/bustin-out-career' }
  ],

  // Farm Frenzy
  'farm-frenzy-one-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy One Product", }
  ],
  'farm-frenzy-one-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy One Product", link: '/farm-frenzy/one-product' }
  ],
  'farm-frenzy-two-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Product", }
  ],
  'farm-frenzy-two-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Product", link: '/farm-frenzy/two-product' }
  ],
  'farm-frenzy-three-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Three Product", }
  ],
  'farm-frenzy-three-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Three Product", link: '/farm-frenzy/three-product' }
  ],
  'farm-frenzy-two-pizza-product': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Pizza Product", }
  ],
  'farm-frenzy-two-pizza-product-detail': [
    { label: "Farm Frenzy", link: '/farm-frenzy' },
    { label: "Farm Frenzy Two Pizza", link: '/farm-frenzy/two-pizza-product' }
  ],

  // Pizza Frenzy
  'pizza-frenzy-topping': [
    { label: "Pizza Frenzy", link: '/pizza-frenzy' },
    { label: "Pizza Frenzy Topping", }
  ],
  'pizza-frenzy-topping-detail': [
    { label: "Pizza Frenzy", link: '/pizza-frenzy' },
    { label: "Pizza Frenzy Topping", link: '/pizza-frenzy/topping' }
  ],
});