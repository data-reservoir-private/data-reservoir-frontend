export interface CygnusSeeds {
  Name: string,
  Image: string,
  Source: {
    Name: string,
    PriceGold: number | null,
    PriceItems: {
      Name: string,
      Quantity: number
    }[]
  }[] | null;
}

export interface CygnusSpecial {
  Regrowth: number | null,
  Extra: boolean | null,
  Trellis: boolean | null,
  Irrigation: boolean | null,
  Harvest: number | null,
  Giant: string | null,
  Byproduct: null | {
    Name: string,
    PossibleQuantities: number[]
  }[]
}

export interface CygnusCropStage { 
  Ongoing: {
    Duration: number,
    DurationIrrigated: number | null,
    Image: string
  }[],
  Done: {
    Harvest: string,
    Regrowth: string | null
  }
}