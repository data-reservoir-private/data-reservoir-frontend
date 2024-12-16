import { PiBarn } from 'react-icons/pi';
import { TransjakartaIcon } from "@/components/icon/icons";
import { IconType } from "react-icons";
import { BiSolidHome } from "react-icons/bi";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";
import { FaBowlFood, FaPizzaSlice } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";
import { GiCrystalGrowth, GiPolarStar } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";

export type ROUTE =
  "dashboard" | "transjakarta" | "hayday" |
  "the-sims" | "pizza-frenzy" | "farm-frenzy" |
  "nasi-goreng" | "quartz" | "cygnus" | "transaction" | "docs";

export type ROUTE_TYPE = {
  id: ROUTE,
  name: string,
  icon: IconType,
  link: string,
  inactive?: boolean,
  beta?: boolean,
  new?: boolean,
};

export const ROUTES: ROUTE_TYPE[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BiSolidHome,
    link: '/dashboard'
  },
  {
    id: 'the-sims',
    name: 'The Sims',
    icon: BsFillSuitDiamondFill,
    link: '/the-sims'
  },
  {
    id: 'farm-frenzy',
    name: 'Farm Frenzy',
    icon: PiBarn,
    link: '/farm-frenzy'
  },
  {
    id: 'hayday',
    name: 'Hayday',
    icon: CiWheat,
    link: '/hayday'
  },
  {
    id: 'pizza-frenzy',
    name: 'Pizza Frenzy',
    icon: FaPizzaSlice,
    link: '/pizza-frenzy'
  },
  {
    id: 'nasi-goreng',
    name: 'Nasi Goreng',
    icon: FaBowlFood,
    link: '/nasi-goreng'
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    icon: GiPolarStar,
    link: '/cygnus'
  },
  {
    id: 'quartz',
    name: 'Quartz',
    icon: GiCrystalGrowth,
    link: '/quartz'
  },
  {
    id: 'transaction',
    name: 'Transaction',
    icon: GrTransaction,
    link: '/transaction',
    beta: true
  },
  {
    id: 'transjakarta',
    name: 'Transjakarta',
    icon: TransjakartaIcon,
    link: '/transjakarta',
    inactive: true,
  },
  {
    id: 'docs',
    name: 'Documentation',
    icon: IoIosDocument,
    link: '/docs',
    inactive: true
  },
];