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
  'the-sims-castaway-product': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims building" }
  ],
  'the-sims-castaway-product-detail': [
    { label: "The Sims", link: '/the-sims' },
    { label: "The Sims Building", link: '/the-sims/castaway-product' }
  ],
});