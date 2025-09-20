export interface IPeriodicTableElementResponse {
  id: string
  name: string
  symbol: string
  number: number
  period: number
  group: number
  category:
  'actinide' |
  'lanthanide' |
  'post-transition metal' |
  'metalloid' |
  'diatomic nonmetal' |
  'polyatomic nonmetal' |
  'transition metal' |
  'alkaline earth metal' |
  'alkali metal' |
  'noble gas' |
  'unknown, probably transition metal' |
  'unknown, but predicted to be an alkali metal' |
  'unknown, predicted to be noble gas' |
  'unknown, probably post-transition metal' |
  'unknown, probably metalloid',

  appearance?: string
  discoveredBy?: string
  namedBy?: string
  phase: 'Gas' | 'Liquid' | 'Solid'
  summary: string
  block: 's' | 'p' | 'd' | 'f'
  image: string
  atomicMass: number,
  xpos: number
  ypos: number
  wxpos: number
  wypos: number
}