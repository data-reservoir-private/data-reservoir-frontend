import { PiBarn } from 'react-icons/pi';
import { TransjakartaIcon } from "@/components/icon/icons";
import { IconType } from "react-icons";
import { BiSolidHome } from "react-icons/bi";
import { BsFillSuitDiamondFill, BsDatabaseFillDown } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";
import { FaBowlFood, FaPizzaSlice } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";
import { GiCrystalGrowth, GiPolarStar } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { TbAtom2Filled } from "react-icons/tb";

export type ROUTE =
  "dashboard" | "transjakarta" | "hayday" |
  "the-sims" | "pizza-frenzy" | "farm-frenzy" | "element" |
  "nasi-goreng" | "quartz" | "cygnus" | "transaction" |
  "docs" | "export";

export type ROUTE_TYPE = {
  id: ROUTE,
  name: string,
  icon: IconType,
  link: string,
  inactive?: boolean,
  beta?: boolean,
  new?: boolean,
};

export const ROUTES: ROUTE_TYPE[][] = [
  [
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
      id: 'hayday',
      name: 'Hayday',
      icon: CiWheat,
      link: '/hayday'
    },
    {
      id: 'farm-frenzy',
      name: 'Farm Frenzy',
      icon: PiBarn,
      link: '/farm-frenzy'
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
      id: 'quartz',
      name: 'Quartz',
      icon: GiCrystalGrowth,
      link: '/quartz'
    },
    {
      id: 'cygnus',
      name: 'Cygnus',
      icon: GiPolarStar,
      link: '/cygnus'
    },
    // {
    //   id: 'element',
    //   name: 'Element',
    //   icon: TbAtom2Filled,
    //   link: '/element',
    //   inactive: true
    // },
    // {
    //   id: 'transaction',
    //   name: 'Transaction',
    //   icon: GrTransaction,
    //   inactive: true,
    //   link: '/transaction',
    //   beta: true
    // },
    // {
    //   id: 'transjakarta',
    //   name: 'Transjakarta',
    //   icon: TransjakartaIcon,
    //   inactive: true,
    //   link: '/transjakarta',
    //   beta: true
    // },
  ],
  [
    {
      id: 'export',
      name: 'Export Data',
      icon: BsDatabaseFillDown,
      link: '/export',
    },
    // {
    //   id: 'docs',
    //   name: 'Documentation',
    //   icon: IoIosDocument,
    //   link: '/docs',
    //   inactive: true,
    // },
  ]
];