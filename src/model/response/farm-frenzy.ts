export type IFarmFrenzyResponse = {
  'three': {
    id: string,
    name: string,
    image: string,
    price: number
  },
  'one': {
    id: string,
    name: string,
    image: string,
    price: number,
    size: number
  },
  'one-detail': IFarmFrenzyResponse['one'] & {
    recipe: {
      id: string,
      name: string,
      image: string
    } | null,
    usage: {
      id: string,
      name: string,
      image: string
    } | null
  },
  'two': {
    id: string,
    name: string,
    image: string,
    price: number,
    size: number
  },
  'two-detail': IFarmFrenzyResponse['two'] & {
    recipe: {
      id: string,
      name: string,
      image: string
    }[],
    usage: {
      id: string,
      name: string,
      image: string
    } | null
  },
  'two-pizza': {
    id: string,
    name: string,
    image: string,
    price: number,
    priceBuy: number,
    size: number
  },
  'two-pizza-detail': IFarmFrenzyResponse['two-pizza'] & {
    recipe: {
      id: string,
      name: string,
      image: string
    }[],
    usage: {
      id: string,
      name: string,
      image: string
    }[]
  },
  'hurricane': {
    id: string,
    name: string,
    image: string,
    price: number,
    priceBuy: number,
    size: number
  },
  'hurricane-detail': IFarmFrenzyResponse['hurricane'] & {
    recipe: {
      id: string,
      name: string,
      image: string
    }[],
    usage: {
      id: string,
      name: string,
      image: string
    } | null
  },
}