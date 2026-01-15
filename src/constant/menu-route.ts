import { ElementIcon, TransjakartaIcon } from "@/components/icon/icons";
import { IconType } from "react-icons";
import { BiSolidHome } from "react-icons/bi";
import { BsFillSuitDiamondFill, BsDatabaseFillDown } from "react-icons/bs";
import { FaBowlFood, FaPizzaSlice } from "react-icons/fa6";
import { IoIosDocument } from "react-icons/io";
import { GiPolarStar } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { BiSolidLeaf } from "react-icons/bi";
import { PiBarnFill } from "react-icons/pi";
import { FaCookieBite } from "react-icons/fa";

export type ROUTE =
  "dashboard" | "transjakarta" | "hayday" |
  "the-sims" | "pizza-frenzy" | "farm-frenzy" | "element" |
  "nasi-goreng" | "seasons" | "cygnus" | "transaction" |
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
      link: '/dashboard',
    },
    {
      id: 'the-sims',
      name: 'The Sims',
      icon: BsFillSuitDiamondFill,
      link: '/the-sims',
      inactive: true,
    },
    {
      id: 'hayday',
      name: 'Hayday',
      icon: FaCookieBite,
      link: '/hayday'
    },
    {
      id: 'farm-frenzy',
      name: 'Farm Frenzy',
      icon: PiBarnFill,
      link: '/farm-frenzy',
      inactive: true,
    },
    {
      id: 'pizza-frenzy',
      name: 'Pizza Frenzy',
      icon: FaPizzaSlice,
      link: '/pizza-frenzy',
      inactive: true,
    },
    {
      id: 'nasi-goreng',
      name: 'Nasi Goreng',
      icon: FaBowlFood,
      link: '/nasi-goreng',
      inactive: true,
    },
    {
      id: 'seasons',
      name: 'Seasons',
      icon: BiSolidLeaf,
      link: '/seasons',
      inactive: true,
    },
    {
      id: 'cygnus',
      name: 'Cygnus',
      icon: GiPolarStar,
      link: '/cygnus',
      inactive: true,
    },
    {
      id: 'element',
      name: 'Element',
      icon: ElementIcon,
      link: '/periodic-table',
      inactive: true,
    },
    {
      id: 'transaction',
      name: 'Transaction',
      icon: GrTransaction,
      link: '/transaction',
      inactive: true,
    },
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
    {
      id: 'docs',
      name: 'Documentation',
      icon: IoIosDocument,
      link: '/docs',
    },
  ]
];