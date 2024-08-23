'use client'

import BustinOutCareer from "@/components/app/the-sims/BustinOutCareer";
import CastawayProduct from "@/components/app/the-sims/CastawayProduct";
import FourPCHarvestable from "@/components/app/the-sims/FourPCHarvestable";
import TwoConsoleCareer from "@/components/app/the-sims/TwoConsoleCareer";
import TwoPetsConsoleCareer from "@/components/app/the-sims/TwoPetsConsoleCareer";
import TwoPetsConsoleProduct from "@/components/app/the-sims/TwoPetsConsoleProduct";
import { TheSimsTableLabel, TheSimsTableType } from "@/constant/tables";
import { useState } from "react";
import TableSummary from "../shared/TableSummary";

export default function TheSimsClientPage() {
  const [state, setTab] = useState<TheSimsTableType | null>(null);

  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary<TheSimsTableType>
        hasPicker
        category="the_sims"
        initialTab="the_sims_bustin_out_career"
        onPickCategory={e => { setTab(e) }}
        pickerOption={TheSimsTableLabel}
      />

      <div className='min-h-[100vh]'>
        {/* { state === "the_sims_castaway_product" && <CastawayProduct/> } */}
        { state === "the_sims_castaway_product" && <CastawayProduct/> }
        { state === "the_sims_four_pc_harvestable" && <FourPCHarvestable/> }
        { state === "the_sims_bustin_out_career" && <BustinOutCareer/> }
        { state === "the_sims_two_console_career" && <TwoConsoleCareer/> }
        { state === "the_sims_two_pets_console_career" && <TwoPetsConsoleCareer/> }
        { state === "the_sims_two_pets_console_product" && <TwoPetsConsoleProduct/> }
      </div>
    </div>
  )
}