export interface IQuickLink {
  name: string,
  image?: string | (() => React.ReactNode),
  link: string,
  notReady?: boolean
}

export const QUICK_LINKS = Object.freeze({
  'the-sims': [
    { name: "Castaway Product", link: '/the-sims/castaway-product', image: '/image/quick_link/ts_castaway_product.png' },
    { name: "Two Pets Console Product", link: '/the-sims/two-pets-console-product', image: '/image/quick_link/ts2p_product.png' },
    { name: "Three PC Dish", link: '/the-sims/three-pc-dish', image: '/image/quick_link/ts3_pc_dish.png' },
    { name: "Bustin Out Career", link: '/the-sims/bustin-out-career' },
    { name: "Four PC Harvestable", link: '/the-sims/four-pc-harvestable', image: '/image/quick_link/ts4_pc_harvestable.png' },
    { name: "Four PC Metal", link: '/the-sims/four-pc-metal', image: '/image/quick_link/ts4_pc_metal.png' },
    { name: "Four PC Element", link: '/the-sims/four-pc-element', image: '/image/quick_link/ts4_pc_element.png' },
    { name: "Four PC Crystal", link: '/the-sims/four-pc-crystal', image: '/image/quick_link/ts4_pc_crystal.png' },
  ] as IQuickLink[],
  'hayday': [
    { name: "Order", link: '/hayday/order' },
    { name: "Product", link: '/hayday/product', image: '/image/quick_link/hd_product.png' },
    { name: "Building", link: '/hayday/building', image: '/image/quick_link/hd_building.png' },
  ] as IQuickLink[]
});